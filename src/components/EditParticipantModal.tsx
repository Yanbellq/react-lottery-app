import React, { useState, useEffect } from 'react';
import type { FormErrors } from '@/types/participant';
import type { IUser } from '@/types/user';
import { validateEmail, formatPhoneNumber } from '@utils/validation';
import Modal from '@components/ui/Modal';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

interface EditParticipantModalProps {
    isOpen: boolean;
    onClose: () => void;
    participant: IUser | null;
    onUpdate: (participant: IUser) => void;
    participants: IUser[];
}

export default function EditParticipantModal({
    isOpen,
    onClose,
    participant,
    onUpdate,
    participants,
}: EditParticipantModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (participant) {
            setFormData({
                name: participant.name,
                email: participant.email,
                password: participant.password,
                avatar: participant.avatar,
            });
            setErrors({});
        }
    }, [participant]);

    const validateField = (fieldName: keyof typeof formData, value: string): string | undefined => {
        switch (fieldName) {
            case 'name':
                return value.trim() === '' ? 'This value is required.' : undefined;

            case 'email':
                if (value.trim() === '') return 'This value is required.';
                if (!validateEmail(value)) return 'Please enter a valid email address.';
                // Check for duplicate email
                if (participants.some(p => p.email.toLowerCase() === value.toLowerCase())) {
                    return 'A participant with this email already exists.';
                }
                return undefined;

            case 'password':
                if (value.trim() === '') return 'This value is required.';
                if (value.length < 6) return 'Password must be at least 6 characters long.';
                return undefined;

            case 'avatar':
                return value.trim() === '' ? 'This value is required.' : undefined;

            default:
                return undefined;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let processedValue = value;
        if (name === 'phoneNumber') {
            processedValue = formatPhoneNumber(value);
        }

        setFormData(prev => ({ ...prev, [name]: processedValue }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: FormErrors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            password: validateField('password', formData.password),
            avatar: validateField('avatar', formData.avatar),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error !== undefined);

        if (!hasErrors && participant) {
            try {
                const resp = await fetch(
                    `https://api.escuelajs.co/api/v1/users/${participant.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: formData.name,
                            email: formData.email,
                            password: formData.password,
                            avatar: formData.avatar,
                        }),
                    }
                );

                if (!resp.ok) {
                    throw new Error('Failed to update user');
                }

                const updatedUser = await resp.json();

                onUpdate({
                    ...participant,
                    ...updatedUser,
                });
                onClose();
            } catch (error) {
                alert(error);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Participant">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="Enter user name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    isRequired
                />

                <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    isRequired
                />

                <Input
                    type="text"
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    maxLength={14}
                    error={errors.password}
                    isRequired
                />

                <Input
                    type="text"
                    name="avatar"
                    label="Avatar"
                    placeholder="Enter avatar URL"
                    value={formData.avatar}
                    onChange={handleChange}
                    error={errors.avatar}
                    isRequired
                />

                <div className="flex gap-3 pt-4">
                    <Button type="submit" variant="primary" className="flex-1">
                        Update Data
                    </Button>
                    <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

import React, { useState, useEffect } from 'react';
import type { Participant, FormErrors } from '@/types/participant';
import {
    validateEmail,
    validatePhone,
    validateDateNotFuture,
    formatPhoneNumber,
} from '@utils/validation';
import Modal from '@components/ui/Modal';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

interface EditParticipantModalProps {
    isOpen: boolean;
    onClose: () => void;
    participant: Participant | null;
    onUpdate: (participant: Participant) => void;
    participants: Participant[];
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
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (participant) {
            setFormData({
                name: participant.name,
                dateOfBirth: participant.dateOfBirth,
                email: participant.email,
                phoneNumber: participant.phoneNumber,
            });
            setErrors({});
        }
    }, [participant]);

    const validateField = (fieldName: keyof typeof formData, value: string): string | undefined => {
        switch (fieldName) {
            case 'name':
                return value.trim() === '' ? 'This value is required.' : undefined;

            case 'dateOfBirth':
                if (value === '') return 'This value is required.';
                if (!validateDateNotFuture(value)) return 'Date of birth cannot be in the future.';
                return undefined;

            case 'email':
                if (value.trim() === '') return 'This value is required.';
                if (!validateEmail(value)) return 'Please enter a valid email address.';
                // Check for duplicate email (excluding current participant)
                if (
                    participants.some(
                        p =>
                            p.id !== participant?.id &&
                            p.email.toLowerCase() === value.toLowerCase()
                    )
                ) {
                    return 'A participant with this email already exists.';
                }
                return undefined;

            case 'phoneNumber':
                if (value.trim() === '') return 'This value is required.';
                if (!validatePhone(value))
                    return 'Please enter a valid phone number: (XXX) XXX-XXXX';
                return undefined;

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: FormErrors = {
            name: validateField('name', formData.name),
            dateOfBirth: validateField('dateOfBirth', formData.dateOfBirth),
            email: validateField('email', formData.email),
            phoneNumber: validateField('phoneNumber', formData.phoneNumber),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error !== undefined);

        if (!hasErrors && participant) {
            onUpdate({
                ...participant,
                ...formData,
            });
            onClose();
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
                    type="date"
                    name="dateOfBirth"
                    label="Date of Birth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    error={errors.dateOfBirth}
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
                    name="phoneNumber"
                    label="Phone number"
                    placeholder="Enter Phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    maxLength={14}
                    error={errors.phoneNumber}
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

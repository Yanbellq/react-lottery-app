import React, { useState } from 'react';
import type { FormErrors } from '@/types/participant';
import type { IUser } from '@/types/user';
import { validateEmail, formatPhoneNumber } from '@utils/validation';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

interface RegisterFormProps {
    onAddParticipant: (participant: Omit<IUser, 'id'>) => void;
    participants: IUser[];
}

export default function RegisterForm({ onAddParticipant, participants }: RegisterFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
        avatar: false,
    });

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

        if (touched[name as keyof typeof touched]) {
            const error = validateField(name as keyof typeof formData, processedValue);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        const error = validateField(name as keyof typeof formData, value);
        setErrors(prev => ({ ...prev, [name]: error }));
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
        setTouched({
            name: true,
            email: true,
            password: true,
            avatar: true,
        });

        const hasErrors = Object.values(newErrors).some(error => error !== undefined);

        if (!hasErrors) {
            try {
                const resp = await fetch('https://api.escuelajs.co/api/v1/users/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        avatar: formData.avatar,
                    }),
                });

                if (!resp.ok) {
                    throw new Error('Failed to register user');
                }

                const user = await resp.json();

                onAddParticipant({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    avatar: user.avatar,
                    role: user.role,
                });

                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    avatar: '',
                });

                setErrors({});
                setTouched({
                    name: false,
                    email: false,
                    password: false,
                    avatar: false,
                });
            } catch (error) {
                alert(error);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e as React.FormEvent);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold text-gray-800">REGISTER FORM</h2>
            <p className="text-md text-gray-500 mb-6">Please fill in all the fields.</p>

            <form
                onSubmit={handleSubmit}
                onKeyDown={handleKeyDown}
                className="space-y-4 flex flex-col"
            >
                <Input
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="Enter user name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name ? errors.name : undefined}
                    isRequired
                />

                <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email && touched.email ? errors.email : undefined}
                    isRequired
                />

                <Input
                    type="text"
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={14}
                    error={errors.password && touched.password ? errors.password : undefined}
                    isRequired
                />

                <Input
                    type="text"
                    name="avatar"
                    label="Avatar"
                    placeholder="Enter avatar URL"
                    value={formData.avatar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.avatar && touched.avatar ? errors.avatar : undefined}
                    isRequired
                />

                <Button type="submit" variant="primary" className="ml-auto">
                    Save
                </Button>
            </form>
        </div>
    );
}

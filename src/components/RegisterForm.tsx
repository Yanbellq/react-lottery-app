import React, { useState } from 'react';
import type { Participant, FormErrors } from '@/types/participant';
import {
    validateEmail,
    validatePhone,
    validateDateNotFuture,
    formatPhoneNumber,
} from '@utils/validation';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

interface RegisterFormProps {
    onAddParticipant: (participant: Omit<Participant, 'id'>) => void;
    participants: Participant[];
}

export default function RegisterForm({ onAddParticipant, participants }: RegisterFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState({
        name: false,
        dateOfBirth: false,
        email: false,
        phoneNumber: false,
    });

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
                // Check for duplicate email
                if (participants.some(p => p.email.toLowerCase() === value.toLowerCase())) {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: FormErrors = {
            name: validateField('name', formData.name),
            dateOfBirth: validateField('dateOfBirth', formData.dateOfBirth),
            email: validateField('email', formData.email),
            phoneNumber: validateField('phoneNumber', formData.phoneNumber),
        };

        setErrors(newErrors);
        setTouched({
            name: true,
            dateOfBirth: true,
            email: true,
            phoneNumber: true,
        });

        const hasErrors = Object.values(newErrors).some(error => error !== undefined);

        if (!hasErrors) {
            onAddParticipant(formData);

            setFormData({
                name: '',
                dateOfBirth: '',
                email: '',
                phoneNumber: '',
            });

            setErrors({});
            setTouched({
                name: false,
                dateOfBirth: false,
                email: false,
                phoneNumber: false,
            });
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
                    type="text"
                    name="dateOfBirth"
                    label="Date of Birth"
                    placeholder="mm.dd.yyyy"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                        errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : undefined
                    }
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
                    name="phoneNumber"
                    label="Phone number"
                    placeholder="Enter Phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={14}
                    error={
                        errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : undefined
                    }
                    isRequired
                />

                <Button type="submit" variant="primary" className="ml-auto">
                    Save
                </Button>
            </form>
        </div>
    );
}

import React from 'react';
import Input from '@components/ui/Input';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export default function SearchBar({ value, onChange, className }: SearchBarProps) {
    return (
        <div className={`mb-4 ${className}`}>
            <Input
                type="text"
                placeholder="Search by name..."
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}

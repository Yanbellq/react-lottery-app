import React from 'react';
import type { IUser } from '@/types/user';

interface WinnerCardProps {
    winner: IUser;
    onRemove: (id: string) => void;
}

export default function WinnerCard({ winner, onRemove }: WinnerCardProps) {
    return (
        <div className="bg-blue-100 text-cyan-800 text-sm px-2 py-1 rounded-md flex items-center gap-2 hover:bg-cyan-200 transition-colors">
            <span className="font-medium">{winner.name}</span>
            <button
                onClick={() => onRemove(winner.id)}
                className="text-cyan-600 hover:text-cyan-800 font-bold text-lg leading-none"
                aria-label="Remove winner"
            >
                ×
            </button>
        </div>
    );
}

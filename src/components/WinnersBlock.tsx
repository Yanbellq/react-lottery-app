import React from 'react';
import type { IUser } from '@/types/user';
import Button from '@components/ui/Button';
import WinnerCard from '@components/WinnerCard';

interface WinnersBlockProps {
    winners: IUser[];
    onRemoveWinner: (id: string) => void;
    className?: string;
    selectRandomWinner: () => void;
    isNewWinnerDisabled: boolean;
}

export default function WinnersBlock({
    winners,
    onRemoveWinner,
    className,
    selectRandomWinner,
    isNewWinnerDisabled,
}: WinnersBlockProps) {
    return (
        <div className={`flex items-center gap-5 bg-white rounded-lg shadow-md p-6 ${className}`}>
            <h2 className="text-lg font-bold text-gray-800">WINNERS:</h2>

            {winners.length === 0 ? (
                <div className="text-center text-gray-400">No winners yet</div>
            ) : (
                <div className="flex flex-wrap gap-3">
                    {winners.map(winner => (
                        <WinnerCard key={winner.id} winner={winner} onRemove={onRemoveWinner} />
                    ))}
                </div>
            )}
            {/* New Winner Button */}
            <div className="flex items-start ml-auto">
                <Button
                    onClick={selectRandomWinner}
                    disabled={isNewWinnerDisabled}
                    className="text-base"
                >
                    New winner
                </Button>
            </div>
        </div>
    );
}

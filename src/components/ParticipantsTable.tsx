import React, { useState } from 'react';
import type { Participant, SortField, SortOrder } from '@/types/participant';
import Button from '@components/ui/Button';
import Modal from '@components/ui/Modal';

interface ParticipantsTableProps {
    participants: Participant[];
    onEdit: (participant: Participant) => void;
    onDelete: (id: string) => void;
    sortField: SortField | null;
    sortOrder: SortOrder;
    onSort: (field: SortField) => void;
}

// --- ВИНОСИШ НАВЕРХ ФАЙЛУ (перед ParticipantsTable) ---
const SortIcon = ({
    field,
    sortField,
    sortOrder,
}: {
    field: SortField;
    sortField: SortField | null;
    sortOrder: SortOrder;
}) => {
    if (sortField !== field) {
        return <span className="text-gray-400 ml-1">↕</span>;
    }
    return <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
};

export default function ParticipantsTable({
    participants,
    onEdit,
    onDelete,
    sortField,
    sortOrder,
    onSort,
}: ParticipantsTableProps) {
    const [deleteConfirm, setDeleteConfirm] = useState<Participant | null>(null);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}.${day}.${year}`;
    };

    const handleDeleteClick = (participant: Participant) => {
        setDeleteConfirm(participant);
    };

    const confirmDelete = () => {
        if (deleteConfirm) {
            onDelete(deleteConfirm.id);
            setDeleteConfirm(null);
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-6">
                {participants.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">No participants yet</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b-2 border-gray-300">
                                    <th className="text-left p-3 font-semibold text-gray-700">#</th>
                                    <th
                                        className="text-left p-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-200"
                                        onClick={() => onSort('name')}
                                    >
                                        Name{' '}
                                        <SortIcon
                                            field="name"
                                            sortField={sortField}
                                            sortOrder={sortOrder}
                                        />
                                    </th>
                                    <th
                                        className="text-left p-3 font-semibold text-gray-700 cursor-pointer hover:bg-gray-200"
                                        onClick={() => onSort('dateOfBirth')}
                                    >
                                        Date of Birth{' '}
                                        <SortIcon
                                            field="dateOfBirth"
                                            sortField={sortField}
                                            sortOrder={sortOrder}
                                        />
                                    </th>
                                    <th className="text-left p-3 font-semibold text-gray-700">
                                        Email
                                    </th>
                                    <th className="text-left p-3 font-semibold text-gray-700">
                                        Phone number
                                    </th>
                                    <th className="text-center p-3 font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {participants.map((participant, index) => (
                                    <tr
                                        key={participant.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="p-3 text-gray-500">{index + 1}</td>
                                        <td className="p-3 text-gray-500">{participant.name}</td>
                                        <td className="p-3 text-gray-500">
                                            {formatDate(participant.dateOfBirth)}
                                        </td>
                                        <td className="p-3 text-gray-500">{participant.email}</td>
                                        <td className="p-3 text-gray-500">
                                            {participant.phoneNumber}
                                        </td>
                                        <td className="p-3">
                                            <div className="flex gap-2 justify-center">
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => onEdit(participant)}
                                                    className="text-sm"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDeleteClick(participant)}
                                                    className="text-sm"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                title="Confirm Deletion"
            >
                <div className="space-y-4">
                    <p className="text-gray-700">
                        Are you sure you want to delete participant{' '}
                        <strong>{deleteConfirm?.name}</strong> ({deleteConfirm?.email})?
                    </p>
                    <div className="flex gap-3">
                        <Button variant="danger" onClick={confirmDelete} className="flex-1">
                            Yes
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteConfirm(null)}
                            className="flex-1"
                        >
                            No
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

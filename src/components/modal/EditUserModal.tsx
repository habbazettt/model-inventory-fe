import { X } from "lucide-react";
import { useState, useEffect, type FormEvent } from "react";
import Button from "../Button";

interface User {
    id: number;
    email: string;
    role: string;
    lastLogin: string;
}

interface EditUserModalProps {
    isOpen: boolean
    onClose: () => void
    onEditUser: (userId: number, updatedUser: { email: string; role: string }) => void
    user: User | null
}

export function EditUserModal({ isOpen, onClose, onEditUser, user }: EditUserModalProps) {
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setRole(user.role);
        }
    }, [user]);

    if (!isOpen || !user) {
        return null
    }

    const resetForm = () => {
        setEmail("");
        setRole("");
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!email || !role) {
            alert("Please fill in all fields.");
            return;
        }

        onEditUser(user.id, {
            email,
            role
        });
        resetForm();
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 no-spinner"
            onClick={onClose}
        >
            {/* Modal Content */}
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-lg font-semibold">Edit User</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="editEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="editEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="user@baac.th"
                                required
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label htmlFor="editRole" className="block text-sm font-medium text-gray-700 mb-1">
                                Role
                            </label>
                            <select
                                id="editRole"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            >
                                <option value="" disabled>Select a role</option>
                                <option value="developer">Developer</option>
                                <option value="validator">Validator</option>
                                <option value="approver">Approver</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {/* Last Login Info (Read-only) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Login
                            </label>
                            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600">
                                {user.lastLogin}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-end space-x-3 border-t pt-4">
                        <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
                        <Button type="submit">Update User</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
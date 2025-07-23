import { X } from "lucide-react";
import type { Logs, Model } from "../../types";
import Button from "../Button";

interface AuditLogsModalProps {
    logs: Logs[] | null;
    model: Model | undefined;
    onClose: () => void;
}

export default function AuditLogsModal({ logs, onClose, model }: AuditLogsModalProps) {
    if (!logs || !model) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Konten Modal */}
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{model.id} - {model.name}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>

                {/* Logs Table */}
                <div className="p-5">
                    <table className="min-w-full border text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-2 py-1 border">Timestamp</th>
                                <th className="px-2 py-1 border">User</th>
                                <th className="px-2 py-1 border">Action</th>
                                <th className="px-2 py-1 border">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(logs) && logs
                                // .filter(log => log.model_id === model.id)
                                .map(log => (
                                    <tr key={log.id}>
                                        <td className="px-2 py-1 border">{new Date(log.timestamp).toLocaleString()}</td>
                                        <td className="px-2 py-1 border">{log.user}</td>
                                        <td className="px-2 py-1 border">{log.action_type}</td>
                                        <td className="px-2 py-1 border">{log.action_description}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                {/* Tombol Aksi */}
                <div className="mt-6 flex justify-between space-x-3 border-t p-5">
                    <Button onClick={onClose} variant="secondary" type="button">Dismiss</Button>
                </div>
            </div>
        </div>
    );
}
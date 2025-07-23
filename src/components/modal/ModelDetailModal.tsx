import { X } from "lucide-react";
import type { Model } from "../../types";
import { getStatusColor } from "../../utils/statusUtils";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

interface ModelDetailModalProps {
    model: Model | null;
    onClose: () => void;
}

export default function ModelDetailModal({ model, onClose }: ModelDetailModalProps) {
    const role = localStorage.getItem("role");
    const navigate = useNavigate()
    if (!model) {
        return null;
    }

    const handleViewDetails = () => {
        switch (role) {
            case "developer":
                navigate(`/developer/model/${model.id}`);
                break;
            case "validator":
                navigate(`/validator/model/${model.id}`);
                break;
            case "approver":
                navigate(`/approver/model/${model.id}`);
                break;
            case "superuser":
                navigate(`/superuser/model/${model.id}`);
                break;
            default:
                navigate(`/user/model/${model.id}`);
        }
    };

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
                <div className="p-5">
                    <p className="text-sm text-gray-700">
                        <span className="font-bold">Status:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(model.status)}`}>
                            {model.status}
                        </span>
                    </p>
                </div>
                <div className="p-5">
                    <p className="text-sm text-gray-700 font-bold">Description:</p>
                    <p className="text-sm text-gray-700">{model.description}</p>
                </div>
                <div className="p-5">
                    <p className="text-sm text-gray-700 font-bold">Formula:</p>
                    <img
                        src="/dummy-formula.svg"
                        alt="model formula"
                        className="w-full h-auto px-5"
                    />
                </div>
                <div className="mt-4 px-5 space-y-2">
                    <p className="text-sm text-gray-700">
                        <span className="font-bold">Date Initiated:</span>
                        {new Intl.DateTimeFormat('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }).format(new Date())}
                    </p>
                    <p className="text-sm text-gray-700">
                        <span className="font-bold">Date Validated:</span>
                        {new Intl.DateTimeFormat('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }).format(new Date())}
                    </p>
                    <p className="text-sm text-gray-700">
                        <span className="font-bold">Date Approved:</span>
                        {new Intl.DateTimeFormat('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }).format(new Date())}
                    </p>
                </div>

                {/* Tombol Aksi */}
                <div className="mt-6 flex justify-between space-x-3 border-t p-5">
                    <Button onClick={onClose} variant="secondary" type="button">Close</Button>
                    <Button
                        type="button"
                        onClick={handleViewDetails}
                        variant="primary"
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
}
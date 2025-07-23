import { X } from "lucide-react";
import { useState } from "react";
import Button from "../Button";

interface NotificationData {
    id: number;
    reviewNotes: string;
}

interface ReplyModalProps {
    notification: NotificationData | null;
    onClose: () => void;
    onSubmit: (replyText: string) => void;
}

export default function ReplyModal({ notification, onClose, onSubmit }: ReplyModalProps) {
    const [replyText, setReplyText] = useState("");

    if (!notification) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) {
            alert("Reply message cannot be empty.");
            return;
        }
        onSubmit(replyText);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-lg relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-lg font-semibold text-gray-900">Reply to Notification</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-800">Original Note:</p>
                            <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded-md border">
                                "{notification.reviewNotes}"
                            </p>
                        </div>

                        <div>
                            <label htmlFor="replyMessage" className="block text-sm font-semibold text-gray-800">
                                Your Reply:
                            </label>
                            <textarea
                                id="replyMessage"
                                rows={4}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-2"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type your reply here..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 border-t p-4 bg-gray-50 rounded-b-lg">
                        <Button
                            onClick={onClose}
                            variant="secondary"
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                        >
                            Send Reply
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
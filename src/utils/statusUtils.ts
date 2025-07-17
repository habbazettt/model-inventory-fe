import type { ModelStatus } from "../types";

export const getStatusColor = (status: ModelStatus): string => {
    switch (status) {
        case "Approved": return "bg-green-100 text-green-800";
        case "Requires Validation": return "bg-yellow-100 text-yellow-800";
        case "Requires Approval": return "bg-red-100 text-red-800";
        case "Retired": return "bg-gray-100 text-gray-800";
        default: return "bg-gray-100 text-gray-800";
    }
};
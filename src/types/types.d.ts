export interface Model {
    id: string;
    name: string;
    description: string;
    owner: string;
    status: ModelStatus;
}

export type ModelStatus = "Approved" | "Requires Validation" | "Requires Approval" | "Retired";
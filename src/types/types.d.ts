export interface Model {
    id: string;
    name: string;
    description: string;
    owner: string;
    status: ModelStatus;
}

export interface AddModel {
    name: string;
    description: string;
    initiator: string;
    model_objective: string;
    model_type: string;
    data_source: string;
    model_remarks: string;
    model_file: File | null;
}

export type ModelStatus = "Approved" | "Requires Validation" | "Requires Approval" | "Retired";
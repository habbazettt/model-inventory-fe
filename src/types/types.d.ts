export interface Model {
    id: string
    name: string
    description: string
    initiator: string
    validator?: string
    approver?: string
    date_initiated?: string
    date_validated?: string
    date_approved?: string
    status: ModelStatus
    model_type?: ModelType
    data_source?: File | null
}

export interface AddModel {
    name: string
    description: string
    initiator: string
    model_objective: string
    model_type: string
    data_source: string
    model_remarks: string
    model_file: File | null
}

export type UserRole = "developer" | "validator" | "approver" | "superuser";

export type ModelStatus = "Approved" | "Requires Validation" | "Requires Approval" | "Retired";

export interface Logs {
    id: string
    model_id?: string
    user: string
    action_type: string
    action_description: string
    action_details: string
    timestamp: string
}
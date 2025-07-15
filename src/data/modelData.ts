import type { Model } from "../types";

export const modelData: Model[] = [
    { id: "MOD-01", name: "Early Redemption Risk", description: "Model for predicting early redemption of term deposit products", owner: "Chris02", validator: "William20", date_approved: "22 Jan 2026", status: "Approved" },
    { id: "MOD-02", name: "Prepayment Rate for Loan Products", description: "Model for predicting prepayment rate of fixed term loan products", owner: "Marco12", validator: "William20", date_approved: "22 Jan 2026", status: "Requires Validation" },
    { id: "MOD-03", name: "Delay Payment Rate for Loan Products", description: "Model for predicting delay payment of loan products with linear regression", owner: "Jordan22", validator: "William20", date_approved: "22 Jan 2026", status: "Retired" },
    { id: "MOD-04", name: "Core Non-Maturity Deposit Modelling", description: "Model for predicting core stable portion of non-maturity deposits.", owner: "Jordan22", validator: "William20", date_approved: "22 Jan 2026", status: "Requires Approval" },
    { id: "MOD-05", name: "Rollover of Term Deposits", description: "Model for predecting rollover rate of term deposit products", owner: "Jordan22", validator: "William20", date_approved: "22 Jan 2026", status: "Requires Validation" }
];
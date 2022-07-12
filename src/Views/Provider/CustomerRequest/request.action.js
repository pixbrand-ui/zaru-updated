export const LeadPurchased = (data = null) => {
    return {type : ActionTypes.LEAD_PURCHASED, data : data};
}

export const ResetLeadPurchased = () => {
    return {type : ActionTypes.LEAD_PURCHASED_RESET};
}

export const ActionTypes = {
    LEAD_PURCHASED : "LEAD_PURCHASED",
    LEAD_PURCHASED_RESET : "LEAD_PURCHASED_RESET",
}
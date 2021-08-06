import {COMPANY_EMAIL_SEARCH, COMPANY_NAME_SEARCH, COMPANY_CIN_SEARCH} from "./searchTypes"

export const searchEmailAction = (data) => {
    return {
        type: COMPANY_EMAIL_SEARCH,
        payload: data
    }
}

export const searchNameAction = (data) => {
    return {
        type: COMPANY_NAME_SEARCH,
        payload: data
    }
}
export const searchCINACTION = (data) => {
    return {
        type: COMPANY_CIN_SEARCH,
        payload: data
    }
}

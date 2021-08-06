import { SHOW_CLIENTS} from "./clientTypes"

export const initialSearchState = {clients: [], editClientId: "", deleteClientId: ""}
export const clientsReducer = (state = initialSearchState, action) => {
    switch (action.type) {
        case SHOW_CLIENTS:
            return {...state, clients: action.payload}
        default:
            return state
    }
}

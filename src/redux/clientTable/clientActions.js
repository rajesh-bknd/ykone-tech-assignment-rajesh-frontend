import { SHOW_CLIENTS} from "./clientTypes"

export const showClients = (data) => {
    return {
        type: SHOW_CLIENTS,
        payload: data
    }
}

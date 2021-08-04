import axios from 'axios'

const clientListUrl = `http://localhost:8000/clients`

export const fetClientList = async () => {
    return axios.get(clientListUrl)
}
export const deleteClient = async (clientId) => {
    return axios.delete(`${clientListUrl}/${clientId}`)
}
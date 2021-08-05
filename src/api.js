import axios from 'axios'

const clientListUrl = `http://localhost:8000/clients`

export const fetClientList = async () => {
    return axios.get(clientListUrl)
}
export const deleteClient = async (clientId) => {
    return axios.delete(`${clientListUrl}/${clientId}`)
}

export const updateClient = async (clientId, body) => {
    return axios.post(`${clientListUrl}/${clientId}`, body)
}

export const createClient = async (body) => {
    return axios.post(`${clientListUrl}`, {
        ...body
    })
}
export const searchClient = async (params) => {
    let searchFor = Object.keys(params).filter(key => params[key].length > 0)
    console.log(searchFor)
    const searchParams = {}
    searchFor.forEach(key => {
        searchParams[key] = params[key]
    })
    console.log(searchParams)
    return axios.get(clientListUrl, {params: searchParams})
}

export const getClientInfo = async (clientId) => {
    return axios.get(`${clientListUrl}/${clientId}`)
}


import axios from 'axios'

const clientListUrl = `http://localhost:8000/clients`

/**
 * fetch all clients details from database
 * @returns {Promise<AxiosResponse<any>>}
 */
export const fetClientList = async () => {
    return axios.get(clientListUrl)
}
/**
 *
 * @param {String} clientId
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteClientApi = async (clientId) => {
    return axios.delete(`${clientListUrl}/${clientId}`)
}

/**
 * updates client details based on given clienId
 * @param {String} clientId
 * @param {Object} body
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateClient = async (clientId, body) => {
    return axios.post(`${clientListUrl}/${clientId}`, body)
}

/**
 * Create new client
 * requirements -
 *             email should be valid
 *             CIN number should be 21 in length
 *             name should not contain special characters
 * @param body
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createClient = async (body) => {
    return axios.post(`${clientListUrl}`, {
        ...body
    })
}
/**
 * searches for client information based on cin, name and email
 * @param {{cin:{String},name:{String},email:{String}}} params
 * @returns {Promise<AxiosResponse<any>>}
 */
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

/**
 * get a client detail based on clientId
 * @param {String} clientId
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getClientInfo = async (clientId) => {
    return axios.get(`${clientListUrl}/${clientId}`)
}


import axios from 'axios'

const url = 'http://localhost:3001/api/persons'


const getall = () => {
   const response = axios.get(url)
   return response.then(response => response.data)
}

const create = (newPerson) => {
    const response = axios.post(url,newPerson)
    console.log(response)
    return response.then(response => response.data)
 }

const remove = (id) => {
    const response = axios.delete(`${url}/${id}`)
    return response.then(response => response.data)
}

const update = (id,newPerson) => {
    const response = axios.put(`${url}/${id}`,newPerson)
    return response
}

const server = {
    getall,
    create,
    remove,
    update
}
export default server


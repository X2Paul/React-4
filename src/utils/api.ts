import axios from 'axios'

const API_URL: string = 'https://jsonplaceholder.typicode.com/users'

export const fetchData = async (id: number) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Error fetching data')
  }
}


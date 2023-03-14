import axios, { Axios } from "axios";


export const fetchData = async() => {
    const response = await axios.get("https://dummyjson.com/products")
    return response.data.products
}
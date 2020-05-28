import { API } from "../config";
import queryString from "querystring";



 
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit, skip , filters
  }
  // console.log("user:", user)
   return fetch(`${API}/products/by/search`, {
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
     },
     body: JSON.stringify(data)
   })
   .then(response => {
     return response.json()
   })
   .catch(err => {
     console.log(err)
   })

}

export const getProducts= (sortBy) => {
    // console.log("user:", user)
     return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
       method: "GET",
     
     })
     .then(response => {
       return response.json()
     })
     .catch(err => {
       console.log(err)
     })

  }

  export const getCategories= () => {
    // console.log("user:", user)
     return fetch(`${API}/categories`, {
       method: "GET",
     
     })
     .then(response => {
       return response.json()
     })
     .catch(err => {
       console.log(err)
     })

  }

  export const list= (params) => {
    const query = queryString.stringify(params)
    // console.log("user:", user)
     return fetch(`${API}/products/search?${query}`, {
       method: "GET",
     
     })
     .then(response => {
       return response.json()
     })
     .catch(err => {
       console.log(err)
     })

  }

  export const read = (productId) => {
   
     return fetch(`${API}/product/${productId}`, {
       method: "GET",
     
     })
     .then(response => {
       return response.json()
     })
     .catch(err => {
       console.log(err)
     })

  }
 

  export const listRelated = (productId) => {
    // console.log("user:", user)
     return fetch(`${API}/products/related/${productId}`, {
       method: "GET",
     
     })
     .then(response => {
       return response.json()
     })
     .catch(err => {
       console.log(err)
     })

  }

  export const getBraintreeClientToken = (userId, token) => {
    // console.log("user:", user)
     return fetch(`${API}/braintree/getToken/${userId}`, {
       method: "GET",
       headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
     
     })
     .then(response => {
       return response.json()
     })
     .catch(err => {
       console.log(err)
     })

  }
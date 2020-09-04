import { API } from "../config";
// import user from "../../../Backend/models/user";


export const createCategory = (userId, token, category) => {
    // console.log("user:", user)
     return fetch(`${API}/category/create/${userId}`, {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
       },
       body: JSON.stringify(category)
     })
     .then(response => {
       return response.json()
     })
     .catch(err => {
       console.log(err)
     })

  }

  export const createProduct = (userId, token, product) => {
  
    // console.log("user:", user)
    
     return fetch(`${API}/product/create/${userId}`, {
       method: "POST",
       headers: {
         Authorization: `Bearer ${token}`
       },
       body: product
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

  export const listOrders = (userId, token) => {
    // console.log("user:", user)
     return fetch(`${API}/order/list/${userId}`, {
       method: "GET",
       headers: {
         Accept: 'application/json',
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

  export const getStatusValues = (userId, token) => {
    // console.log("user:", user)
     return fetch(`${API}/order/status-values/${userId}`, {
       method: "GET",
       headers: {
         Accept: 'application/json',
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

  export const updateOrderStatus = (userId, token, orderId, status) => {
    // console.log("user:", user)
     return fetch(`${API}/order/${orderId}/status/${userId}`, {
       method: "PUT",
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
     body: JSON.stringify({status, orderId})
     })
     .then(response => {
       return response.json()
     })
     .catch(err => {
       console.log(err)
     })

  }
/**
to perform crud pn product
get all products 
get single product
update single product
delete single product
 */
  export const  getProducts = (userId, token) => {
     return fetch(`${API}/products?limit=100`, {
      method: "GET",
       
     })
     .then(response => {
       return response.json()
     })
     .catch(err => {
       console.log(err)
     })

  }

  export const deleteProduct = (userId,productId, token) => {
    // console.log("user:", user)
     return fetch(`${API}/product/${productId}/${userId}`, {
       method: "DELETE",
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
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

  export const getProduct = (productId, token) => {
    // console.log("user:", user)
     return fetch(`${API}/product/${productId}`, {
       method: "GET",
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
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

  export const updateProduct = (productId, userId, token, product) => {
    // console.log("user:", user)
     return fetch(`${API}/product/${productId}/${userId}`, {
       method: "PUT",
       headers: {
         Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: product
     })
     .then(response => {
       return response.json()
     })
     .catch(err => {
       console.log(err)
     })

  }
import React, {useState, useEffect} from "react"
import Layout from "./Layout"
import { getCart} from './cartHelpers';
import Card from '../core/Card';
import {Link} from "react-router-dom"
import { isAuthenticated} from '../auth';
import { getBraintreeClientToken } from "./apiCore";



const Checkout = ({products}) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null, 
        error: '',
        instance: {},
        address: ''
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (user, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                setData({...data, error: data.error})
            } else {
                setData({...data, clientToken: data.clientToken})
            }
        })
    }
   useEffect(() => {
       getToken(userId, token)
   }, [])
    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const showCheckout = () => {
        return (
            isAuthenticated() ? (<button className="btn btn-success">Checkout</button>) : (
                <Link to="/signin"><button className="btn btn-primary">Sign in To Checkout</button></Link>
            )
        )
    }

   
return (
  
    <div>
        <h2>Total: ${getTotal()}</h2>
    {showCheckout()}
 
    </div>
     
 
)
}

export default Checkout

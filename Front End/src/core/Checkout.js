import React, {useState, useEffect} from "react"
import { emptyCart} from './cartHelpers';

import {Link} from "react-router-dom"
import { isAuthenticated} from '../auth';
import { getBraintreeClientToken, processPayment } from "./apiCore";
import 'braintree-web'
import DropIn from 'braintree-web-drop-in-react'



const Checkout = ({products}) => {
    const [data, setData] = useState({
        loading: false ,
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
                setData({clientToken: data.clientToken})
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
        isAuthenticated() ? (<div>{showDropIn()}</div>) : (
                <Link to="/signin"><button className="btn btn-primary">Sign in To Checkout</button></Link>
            )
        )
    }

    const buy = () => {
        setData({loading: true})
        let nonce;

        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
           
            nonce = data.nonce

            // console.log('send nonce and total to process', nonce , getTotal(products))
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }
            processPayment(userId, token, paymentData)
            .then(response => {
                console.log(response)
                setData({...data, success: response.success})
                emptyCart(() => {
                    console.log('payment success and emptied cart')
                    setData({loading: false})
                })

            })
            .catch(error => {

            })
        })
        .catch(error => {
            // console.log('drop in error')
            setData({ ...data, error: error.message})
        })
    }

    const showLoading = loading => (
        loading && <center><h2>...Loading</h2></center>
    )

   const showDropIn = () => {
       return (
        <div onBlur={() => setData({...data, error: ''})}>
        {data.clientToken !== null && products.length > 0 ? (
            <div>
                <DropIn options={{
                    authorization: data.clientToken,
                    paypal: {
                        flow: 'vault'
                    }
                }} onInstance={instance => (data.instance = instance)}/>
                <button onClick={buy}className="btn btn-primary btn-block">Pay</button>
            </div>
        ) : null}
    </div>
       )
   }

   const showError = error => (
    
        <div className="alert alert-danger" style={{display: error ? "": 'none'}}>
            {error}
            </div>
   )
   const showSuccess = success => (
    
    <div className="alert alert-info" style={{display: success ? "": 'none'}}>
        Thank you, Your payment was successful
        </div>
)


return (
  
    <div>
        <h2>Total: ${getTotal()}</h2>
        {showLoading(data.loading)}
        {showSuccess(data.success)}
    {showError(data.error)}
    {showCheckout()}
 
    </div>
     
 
)
}

export default Checkout

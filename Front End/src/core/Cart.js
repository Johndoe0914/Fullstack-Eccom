import React, {useState, useEffect} from "react"
import Layout from "./Layout"
import { getCart} from './cartHelpers';
import Card from '../core/Card';
import {Link} from "react-router-dom"



const Cart = () => {
    const [items, setItems] = useState([])

useEffect(() => {
    setItems(getCart())
}, [])
const showItems = items => {
    return (
        <div>
            <h2>Your cart has `${items.length}` items</h2>
            <hr />

            {items.map((product , index) => (
                <Card key={index} product={product} showAddToCartButton={false} cartUpdate={true}/>
            ))}
        </div>
    )
}

const noitemsMessage = () => {
    return (
    <h2>Your cart is empty <br /> <Link to="/shop">Continue Shopping</Link></h2>
    )
}
return (
    <Layout title="Shopping cart" description="Manage your cart items, Add remove checkout or continue shopping" className="container-fluid">
    <div className="row">
        <div className="col-6">
            {items.length > 0 ? showItems(items): noitemsMessage()}
        </div>
        <div className="col-6">
        <p>Show checkout options </p>
        </div>
    </div>
     
    </Layout>
)
}

export default Cart

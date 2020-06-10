import React, {useState, useEffect} from "react"
import Layout from "./Layout"
import { getCart} from './cartHelpers';
import Card from '../core/Card';
import {Link} from "react-router-dom"
import Checkout from './Checkout'



const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false)

useEffect(() => {
    setItems(getCart())
}, [run])


const showItems = items => {
    return (
        <div>
            <h2>Your cart has `${items.length}` items</h2>
            <hr />

            {items.map((product , index) => (
                <Card key={index} run={run} setRun={setRun} product={product} showAddToCartButton={false} cartUpdate={true} showRemoveProductButton={true}/>
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
        <h2 className="mb-4">Your cart summary</h2>
        <hr />
        <Checkout setRun={setRun}
        run={run} products={items} />
        </div>
    </div>
     
    </Layout>
)
}

export default Cart

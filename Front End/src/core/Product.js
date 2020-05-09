import React, {useState, useEffect} from "react"
import Layout from "./Layout"
import {  read, listRelated} from "./apiCore";
import Card from './Card';


const Product = (props) => {
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [error, setError] = useState(false);

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)

    }, [props])



    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                listRelated(data._id).then(data => {
                    if(data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProducts(data)
                    }
                })
            }
        })
    }





    return (
        <Layout title={product.name} description={product.description} className="container-fluid">
           <div className="row">
         <div className="col-8">
         {product && product.description && <Card product={product} showViewProductButton={false} />} 
         </div>
         <div className="col-4">
             <h4>Related Products</h4>
             {relatedProducts.map((product, index) => (
                 <div className="mb-3">
                     <Card key={index} product={product}/>
                 </div>
             ))}
         </div>
               </div> 
       </Layout>
    )
}

export default Product
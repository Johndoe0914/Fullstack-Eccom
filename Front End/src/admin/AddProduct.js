import React, {useState, useEffect} from "react"
import {isAuthenticated} from "../auth";
import { Link} from "react-router-dom"
import Layout from "../core/Layout"
import {createProduct} from './apiAdmin';
import { getCategories} from "./apiAdmin"


const AddProduct = () => {
 
    const [values, setvalues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createProduct: '',
        redirectToProfile: false,
        formData: ''


    })

    const {
        name,
        description,
        price,
        categories,
        quantity,
        loading,
        createdProduct,
        formData, 
        error
    } = values

    //Load categoires and set form data

    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setvalues({...values, error: data.error})
            } else {
                setvalues({...values, categories: data, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
       init()
    }, [])


    const { user, token} = isAuthenticated()

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value

        formData.set(name, value)

        setvalues({...values, [name]: value})

    }

    const clickSubmit = (e) => {
        e.preventDefault()
        setvalues({ ...values, error: '', loading: true})
       
        createProduct(user._id, token, formData)
        .then(data => {
            console.log(error)
            if(data.error) {
               setvalues({...values, error: data.error})
            } else {
                setvalues({ ...values, name: '', description: '', photo: '' , quantity: '', loading: false , createdProduct: data.name})
            }
        })

        
    }

    const newProductForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}> 
        <h4> Post Photo</h4>
            <div className="form-group">
                <label className="text-muted"></label>
                <input onChange={handleChange('photo')}type="file"  name="photo" accept="image/*" />
             
            </div>
            <div className='form-group'>
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control"  value={name} />
            </div>
            <div className='form-group'>
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} type="text" className="form-control"  value={description} />
            </div>
            <div className='form-group'>
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control"  value={price} />
            </div>
            <div className='form-group'>
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')}  className="form-control"  >
                    <option>Please select</option>
                   {categories && categories.map((category, index) => (
                       <option key={index} value={category.id}>{category.name}</option>
                   ))}
                   
                </select>
            </div>
            <div className='form-group'>
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')}  className="form-control"  >
                <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                   
                </select>
            </div>
           
            <div className='form-group'>
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="text" className="form-control"  value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    )

        const showSuccess = () => (
            <div className="alert alert-danger" style={{display: createdProduct ? '': 'none'}}>
           <h2>{`${createdProduct} was created!` }</h2>
        </div>
        )

        const showError = () => (  
            <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
                {error}
            </div>
        )
        const showLoading = () => (
            loading && (<div className="alert alert-success">
                <h2>Loading...</h2>
            </div>)
        )

        const goBack = () => (
            <div className="mt-5">
                <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
            </div>
        )
    return (
        <Layout
        title="Add a new product" 
        description={`Good day ${user.name}, ready to add new product ?`} 
        className="container-fluid" >
            <div className="row">
            <div className="col-md-8 offset-md-2">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newProductForm()}
                {goBack()}
                </div>
        
            </div>
        </Layout>
    )
}

export default AddProduct
import React, {useState} from "react";
import Layout from "../core/Layout";
import { Link} from "react-router-dom";
import { signup } from "../auth"

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
    
  })

  const { name, email , password, error, success} = values

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value})
  }

  

  const clickSubmit = event => {
    event.preventDefault()

    setValues({...values, error: false})

    signup({name, email, password})
    .then(data => {
    
      if(data.error) {
         return setValues({...values, error: data.error, success: false})
      }

      setValues({...values, name: "", email: "", password: "", error: "", success: true})
    })

  }

  
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange("name")} value={name} type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input  onChange={handleChange("email")} value={email} type="email" className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input  onChange={handleChange("password")} value={password} type="password" className="form-control" />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  )

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
    {error}
    </div>
  )
  const showSuccess = () => (
    <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
    New account was created. Please <Link to="/signin"> Sign in</Link>
    </div>
  )
  return (
    <Layout title="Sign up" description="Sign up Here" className="container col-md-8 offset-md-2">
      {showError()}
      {showSuccess()}
      {signUpForm()}
    
        </Layout>
  )
}

export default Signup
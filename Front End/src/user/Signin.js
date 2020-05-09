import React, {useState} from "react"
import { signin , authenticate, isAuthenticated} from "../auth";
import { Redirect} from "react-router-dom"
import Layout from "../core/Layout"


const Signin = () => {
    const [values, setValues] = useState({

      email: 'qwerty@mail.com',
      password: 'qwerty1',
         error: '',
      loading: false,
      redirectToReferrer: false
      
    })
  
    const {  email , password, error, loading, redirectToReferrer} = values
    const {user} = isAuthenticated()

    const handleChange = name => event => {
      setValues({...values, error: false, [name]: event.target.value})
    }
  
    
  
    const clickSubmit = event => {
      event.preventDefault()
  
      setValues({...values, error: false, loading: true})
  
      signin({email, password})
      .then(data => {
      
        if(data.error) {
           return setValues({...values, error: data.error, loading: false})
        } else {
            
            authenticate(data, () => {
                setValues({...values,  redirectToReferrer: true})
            })
        }
  
        
      })
  
    }
  
    
    const signUpForm = () => (
      <form>
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
    const showLoading = () => (
        loading && ( <div className="alert alert-info">
        <h2>Loading...</h2>
</div>)
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if(user && user.role === 1) {
              return <Redirect to="/admin/dashboard" />
            } else {
              return <Redirect to="/user/dashboard" />
            }
        }

        if(isAuthenticated()) {
          return <Redirect to="/home" />
        }
    }
    return (
      <Layout title="Sign up" description="Sign up Here" className="container col-md-8 offset-md-2">
        {showError()}
        {showLoading()}
        {signUpForm()}
        {redirectUser()}
      
          </Layout>
    )
  }
  
export default Signin
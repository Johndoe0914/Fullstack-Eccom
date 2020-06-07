import React, {Fragment} from 'react';
import { Link , withRouter} from "react-router-dom";
import { signout, isAuthenticated} from "../auth";
import {  itemTotal} from "./cartHelpers";
import "./Menu.css";


const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: "#ff9900"}
    } else {
        return {color: "#ffffff"}
    }
}

const Menu = ({history}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                    <Link className="nav-link" to="/" style={isActive(history, "/")}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/shop" style={isActive(history, "/shop")}>Shop</Link>
                </li>
                <li className="nav-item">
    <Link className="nav-link" to="/cart" style={isActive(history, "/cart")}>Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
                </li>
              
              
                {!isAuthenticated() && (
                    <Fragment>
                          <li className="nav-item">
                    <Link className="nav-link" to="/Signin" style={isActive(history, "/signin")}>Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/Signup" style={isActive(history, "/signup")}>Sign Up</Link>
                </li>
                
                    </Fragment>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                     <Fragment>
                     <li className="nav-item">
                     <Link className="nav-link" to="/admin/dashboard" style={isActive(history, "/admin/dashboard")}>Dashboard</Link>
                 </li>
                 <li className="nav-item">
                    <span className="nav-link" onClick={() => signout(() => {
                        history.push('/')
                    })} style={{cursor: 'pointer', color: '#ffffff'}}>Sign Out</span>
                </li>
                 </Fragment>
                 
                )}

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <Fragment>
                         <li className="nav-item">
                    <span className="nav-link" onClick={() => signout(() => {
                        history.push('/')
                    })} style={{cursor: 'pointer', color: '#ffffff'}}>Sign Out</span>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/user/dashboard" style={isActive(history, "/dashboard")}>Dashboard</Link>
                </li>
                    </Fragment>
                )}
               

               
            </ul>
        </div>
    )
}

export default withRouter(Menu)
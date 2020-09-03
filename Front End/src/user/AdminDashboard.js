import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";



const AdminDashboard = () => {

    const {user: {name, email, role}} = isAuthenticated()

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link className="nav-link" to="/category/create">Create Category</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/product/create">Create products</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to="/admin/orders">View All Orders</Link>
                        </li>

                    </ul>
                </h4>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">Name: {name}</li>
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Role: {role === 1 ? 'Admin' : "Registered User"}</li>
            </ul>
        </div>
        )
    }

  
    return (
        <Layout title="Admin Dashboard" description={`Good day, ${name}`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {adminLinks()}
                </div>
                <div className="col-9">
                    {adminInfo()}
          
                </div>
            </div>

        
        </Layout>
    )
}

export default AdminDashboard
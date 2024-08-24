import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
    let navigate = useNavigate();

    const onChange = (e)=> {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        if (credentials.password !== credentials.cpassword) {
            props.showAlert("Passwords do not match", "warning");
            return;
        }
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/");
            props.showAlert("Account Created Successfully", "success")
        }
        else{
            props.showAlert("Invalid Details", "danger");
        }
    }
    return (
        <div className='container mt-2'>
            <h2 className='mb-4'>Create an account to use pNotebook</h2>
           
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="name" class="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={credentials.name} id="name" onChange={onChange}/>
                </div>
                <div class="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input value={credentials.email} type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label htmlFor="password" class="form-label">Password</label>
                    <input type="password" value={credentials.password} name="password" className="form-control" id="password" onChange={onChange} minLength={5} required/>
                </div>
                <div class="mb-3">
                    <label htmlFor="cpassword" class="form-label">Confirm Password</label>
                    <input type="password" value={credentials.cpassword} name="cpassword" className="form-control" id="cpassword" onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

           
            
        </div>
    )
}

export default Signup
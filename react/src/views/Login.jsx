import { useState, useRef, createRef } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";


function Login() {
    const emailRef = createRef()
    const passwordRef = createRef()
    const [errors,setErrors] = useState(null);
    const {setUser,setToken} = useStateContext()

    const onSubmit = (ev) =>{
        ev.preventDefault();
        const payload = {
            email:emailRef.current.value,
            password:passwordRef.current.value,
        }
    axiosClient.post("/login", payload)
    .then(({data})=>{
        console.log(data)
        setUser(data.user)
        setToken(data.token)
    })
    .catch(err=>{
        const response = err.response;
        if(response && response.status===422){
        console.log(response.data.message,"hello")
            setErrors(response.data.message) 
        }else{
            setErrors({email:[response.data.message]})
        }
    })
    }
    return (
    <div className="login-signup-form animated fadeInDown">
        <div className="form">
            <form onSubmit={onSubmit}>
                <h1 className="title">
                   Login into your account 
                       </h1>
                   {errors && <div className="alert">
                   
                        <p >{errors}</p>
                    
                    </div>
                    }
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                <button className="btn btn-block">Login</button>
                <p className="message">
                    Not Registered? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </div>
    </div>  );
}

export default Login ;


import './../App.css'
import {useNavigate} from "react-router-dom"
import React,{useState,useContext, useEffect} from 'react'
import { AuthContext } from './auth'
import firebaseConfig from '../configFirebase'

const LogIn =()=>{
    const navigate = useNavigate()
    const toRegis=()=>{
        navigate('/register')
    }
    //////////////////////////////
    const [email,setEmail] = useState('')
    const [password,setPass] = useState('')
    
    const emailC =(event)=>{
        setEmail(event.target.value)
    }
    const passwordC =(event)=>{
        setPass(event.target.value)
    } 
    const HandleSubmit=(event)=>{
        event.preventDefault()
        try{
            firebaseConfig.auth().signInWithEmailAndPassword(email,password)
        }catch(error){
            alert(error)
        }
    }
    const {currentUser} = useContext(AuthContext)
    useEffect(()=>{
        if(currentUser){
            navigate('/game')
        }
    },[currentUser])
    /////////////////////////////
    return(
        <div className="frame">
            <div className="mainCom">
            <h1>Log in</h1>
            <form onSubmit={HandleSubmit}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Enter email" onChange={emailC} value={email}/>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                     placeholder="Password" onChange={passwordC} value={password}/>
                </div>
                <div className="butMargin">
                <button type="submit" className="btn btn-primary">Log in</button>
                </div>
                <div>
                    <button type="button" className="btn btn-link"
                    onClick={toRegis}>create accout</button>
                </div>
            </form>
            </div>
        </div>
    )
}
export default LogIn
import './../App.css'
import React, {useState,useEffect,useContext} from 'react'
import {useNavigate} from "react-router-dom"
import firebaseConfig from '../configFirebase'
import { AuthContext } from './auth'
import {updateProfile} from 'firebase/auth'
import { getFirestore, collection, doc, setDoc } from "firebase/firestore/lite"; 

const Regis =()=>{
    const navigate = useNavigate()
    const toLogin=()=>{
        navigate('/login')
    }
    ///////////////////////////////////////////////////////////////
    const [email,setEmail] = useState('')
    const [username,setUname] = useState('')
    const [password,setPass] = useState('')
    const [confirm,setConfirm] = useState('')
    const [cantSubmit,setCantsubmit] = useState(true)

    const emailC =(event)=>{
        setEmail(event.target.value)
    }
    const usernameC =(event)=>{
        setUname(event.target.value)
    }
    const passwordC =(event)=>{
        setPass(event.target.value)
    } 
    const confirmC = (event)=>{
        setConfirm(event.target.value)
    }
    useEffect(()=>{
        if(email!==''&&password!==''&&username!==''&&confirm!==''&&password===confirm){
            setCantsubmit(false)
        }
        else{
            setCantsubmit(true)}
    },[email,password,username,confirm])

    //const [currentUser,setCurrentUser] = useState(null)
    const HandleSubmit=(event)=>{
        event.preventDefault()
        try{
            firebaseConfig.auth().createUserWithEmailAndPassword(email,password)
            //setCurrentUser(true)
        }catch(error){
            alert(error)
        }

    }
    const {currentUser} = useContext(AuthContext)
    const db = getFirestore(firebaseConfig)
    useEffect(()=>{
        if(currentUser){
            if(username!=='')
                {
                    const userRef = collection(db,'20game')
                    setDoc(doc(userRef,currentUser.uid),
                        {Username: username,
                        Score: 0}
                    ).then(()=>
                        {updateProfile(currentUser,{
                            displayName: username,
                            photoURL: 'blank-profile-picture.png'
                        }).then(()=>{navigate('/game')})}
                    )                
                }
            else{
                navigate('/game') 
            }
        }
    },[currentUser])
    

    //////////////////////////////////////////////
    
    return(
        <div className='frame'>
            <div className='mainCom'>
            <h1>Register</h1>
            <form onSubmit={HandleSubmit}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" 
                    aria-describedby="emailHelp" placeholder="Enter email" onChange={emailC} value={email}/>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" onChange={usernameC} value={username}/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" 
                    placeholder="Password"onChange={passwordC} value={password}/>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" 
                    placeholder="Confirm Password" onChange={confirmC} value={confirm}/>
                </div>
                <div className='butMargin'>
                    <button type="submit" className="btn btn-primary" disabled={cantSubmit}>Register</button>
                </div>
                <div>
                    <p className='loginInregis'> have an accout?</p>
                    <button type="button" className="btn btn-link"
                    onClick={toLogin}>Log in</button>
                </div>
            </form>
            </div>
        </div>
    )
}
export default Regis
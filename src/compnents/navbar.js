import { AuthContext } from './auth'
import React,{useContext,useState,useEffect} from 'react'
import firebaseConfig from '../configFirebase'
import { useNavigate } from 'react-router-dom'
import './../App.css'

const Navbar =()=>{
    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext)
    const [username,setUsername] = useState('')
    const [profilrPic,setProfilePic] = useState('')
    useEffect(()=>{
        if(currentUser){
            currentUser.providerData.forEach((profile)=>{
                setUsername(profile.displayName)
                setProfilePic(profile.photoURL)
            })
        }
    },[currentUser])
    const toLogin =()=>{
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar fixed-top navbar-light h-10" style={{backgroundColor:"rgb(0, 153, 255"}}>
                <div className="container-fluid">
                    <a href='/' className="navbar-brand" style={{color:"white"}}>20 game</a>
                    {!currentUser&&
                    <button className="btn btn-outline-primary" style={{color:"white"}} type="button"
                    onClick={toLogin}>Log in</button>}
                    {currentUser&&
                    <div>
                    <img src={profilrPic} style={{height:'20px',width:'20px',borderRadius:'50%',margin:'5px'}} alt='first profile'/>
                    <a href='/profile' style={{color:"white"}}>{username}</a>
                    </div>}
                    {currentUser&&
                    <button className="btn btn-outline-primary" style={{color:"white"}} type="button"
                    onClick={()=>firebaseConfig.auth().signOut()}>Log out</button>}
                </div>
            </nav>
        </div>
    )
}

export default Navbar
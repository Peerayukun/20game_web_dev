import './../App.css'
import {useNavigate} from "react-router-dom"
import React, {useContext} from 'react'
import { AuthContext } from './auth'
import firebaseConfig from '../configFirebase'
import Navbar from './navbar'

const HomeBox =()=>{
    const navigate = useNavigate()
    ////////////////////////////
    const {currentUser} = useContext(AuthContext)
    /////////////////////////////
    const toLogin=()=>{
        navigate('/login')
    }
    const toGame=()=>{
        navigate('/game')
    }
    return(
        <div className="frame">
            <Navbar/>
            <div className="mainCom">
                    <h1>20 Game!!</h1>
                    {!currentUser&&
                        <button 
                        type="button" 
                        className="btn btn-primary btn-lg btn-block butMargin"
                        onClick={toLogin}>
                            Play as user
                        </button>}
                    {currentUser&&
                        <div>
                          <p>You are Logged in</p>
                          <button 
                            type="button" 
                            className="btn btn-primary btn-lg btn-block butMargin"
                            onClick={toGame}>
                                Play as user
                            </button>  
                        </div>}
                    <div></div>
                    {!currentUser&&
                    <button 
                    type="button" 
                    className="btn btn-secondary btn-lg btn-block butMargin"
                    onClick={toGame}>
                    Play as guest
                    </button>}
                    {currentUser&&
                    <button 
                    type="button" 
                    className="btn btn-danger btn-lg btn-block butMargin"
                    onClick={()=>firebaseConfig.auth().signOut()}>
                    Log out
                    </button>}
            </div>
        </div>
    )
}

export default HomeBox;
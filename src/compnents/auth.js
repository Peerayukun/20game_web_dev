import React, {useState,useEffect,createContext} from 'react'
import firebaseConfig from '../configFirebase'

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(()=>{
        firebaseConfig.auth().onAuthStateChanged((user)=>{
            setCurrentUser(user)
            setLoading(false)
        })
        },[])
    if (loading){
        return <p>Loading...</p>
    }
    return(
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>)
}

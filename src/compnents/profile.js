import {useState,useEffect,useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./auth"
import Navbar from "./navbar"
import './../App.css'
import Ranking from "./ranking"
import {ref,getStorage, uploadBytes, getDownloadURL} from 'firebase/storage'
import {updateProfile} from 'firebase/auth'
import {getDocs,getFirestore,collection,doc,setDoc} from 'firebase/firestore/lite'
import firebaseConfig from "../configFirebase"


const Profile=()=>{
    //////////
    const [data,setData] = useState([])
    const [userData,setUserData] = useState(null)
    const db = getFirestore(firebaseConfig)
    async function getData(db){
        var repeat = []
        const dataSnap = await getDocs(collection(db,"20game"))
        dataSnap.forEach((doc) => {
            data.map(i=>{repeat.push(i)})
            repeat.push(doc.data())
            setData(repeat)
            if(currentUser.uid==doc.id){
                setUserData(doc.data())
            }
    })}
    //////////
    const navigate = useNavigate()
    const {currentUser} = useContext(AuthContext)
    const [username,setUsername] = useState('')
    const [profilePic,setProfilePic] = useState('')
    const [display,setDisplay] = useState(true)
    const storage = getStorage()
    useEffect(()=>{
        if(currentUser){
            currentUser.providerData.forEach((profile)=>{
                setUsername(profile.displayName)
                setProfilePic(profile.photoURL)
            })
            getData(db)
        }else{ 
            navigate('/login')
        }
    },[currentUser]) 
    const setting = ()=>{
        setDisplay(true)
    }
    const ranking=()=>{
        setDisplay(false)
    }
    const [newUN,setNewUN] = useState(null)
    const [srcImg,setSrcImg] = useState(null)
    const [notupdate,setNotupdate] = useState(false)
    const usernameC =(event)=>{
        setNewUN(event.target.value)
    }
    const HandleSubmit=(event)=>{
        event.preventDefault()
            if(newUN&&newUN!==''&&!srcImg){
                setNotupdate(true)
                updateProfile(currentUser,{
                    displayName: newUN
                }).then(()=>{
                    const newData = userData
                    newData.Username = newUN
                    const userRef = collection(db,'20game')
                    setDoc(doc(userRef,currentUser.uid),
                    newData)}).then(()=>{
                    window.location.reload(false)})}
            if(srcImg&&(!newUN||newUN==='')){
                setNotupdate(true)
                const imgRef = ref(storage,String(srcImg.name))
                uploadBytes(imgRef,srcImg).then(()=>{
                    getDownloadURL(imgRef).then((url)=>{
                        updateProfile(currentUser,{
                            photoURL: url 
                        }).then(()=>{
                            const newData = userData
                            newData.Username = newUN
                            const userRef = collection(db,'20game')
                            setDoc(doc(userRef,currentUser.uid),
                            newData)}).then(()=>{
                            window.location.reload(false)})
                    })
                })}
            if(newUN&&srcImg){
                setNotupdate(true)
                const imgRef = ref(storage,String(srcImg.name))
                uploadBytes(imgRef,srcImg).then(()=>{
                    getDownloadURL(imgRef).then((url)=>{
                        updateProfile(currentUser,{
                            displayName: newUN,
                            photoURL: url 
                        }).then(()=>{
                            const newData = userData
                            newData.Username = newUN
                            const userRef = collection(db,'20game')
                            setDoc(doc(userRef,currentUser.uid),
                            newData)}).then(()=>{
                            window.location.reload(false)})
                    })
                })
            }
    }

    return (    
        <div className="frame">
            <Navbar/>
            <div className="mainCom">
                <img src={profilePic} alt='profile pic' style={{height:'200px',width:'200px',borderRadius:'50%'}}/>
                <h1>{username}</h1>
                <button type="button" className="btn btn-link" style={{color:'black',marginRight:'50px'}}
                onClick={setting}>Setting</button>
                <button type="button" className="btn btn-link" style={{color:'black',marginLeft:'50px'}}
                onClick={ranking}>Ranking</button>
                <div></div>
                {display&&
                <form onSubmit={HandleSubmit} style={{width:"400px",height:'180px'}}>
                <label>Set new username</label>
                <input type="text" className="form-control" placeholder={username} onChange={usernameC} value={newUN}/>
                <label for="myfile">New profile picture: </label>
                <input type="file" id="myfile" name="myfile" onChange={(event)=>{setSrcImg(event.target.files[0])}}></input>
                <button type="submit" className="btn btn-primary butMargin" disabled={notupdate}>Confirm setting</button>
                </form> }
                {!display&&<Ranking all={data} user={userData}/>}
            </div>
        </div>
    )
}
export default Profile
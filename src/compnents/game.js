import './../App.css'
import React, {useState, useEffect, useContext} from 'react'
import Navbar from './navbar'
import { AuthContext } from './auth'
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore/lite'
import firebaseConfig from '../configFirebase'

const Game=()=>{
    ///////// profile /////////////
    const {currentUser} = useContext(AuthContext)
    const [userScore,setUserScore] = useState(0)
    async function getData(){
        const db = getFirestore(firebaseConfig)
        const q = query(collection(db, "20game"), where("Username", "==", String(currentUser.displayName)))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setUserScore(doc.data().Score);
        });
    }
    async function updatScore(s){
        const db = getFirestore(firebaseConfig)
        const userRef = doc(db,"20game",String(currentUser.uid))
        await updateDoc(userRef,{
            Score: userScore+s
        })
    }
    useEffect(()=>{ 
        if(currentUser){
            getData()
        }
    },[currentUser])
    

    ///////// game algorithm //////////
    const [yourTurn,setTurn] = useState(true)
    const [stop,setStop] = useState(true)
    const [start,setStart] = useState(true)
    const [count,setCount] = useState(0)
    const [last,setLast] = useState(0)
    const [timer,setTimer] = useState(0)
    const [hard,setHard] = useState(false)
    const [easy,setEasy] = useState(false)
    const [score,setScore] = useState(0)

    const replay=()=>{
        setStart(true)
    }
    const Hard = ()=>{
        setEasy(false)
        setHard(true)
        setStop(false)
        setStart(false)
        setTurn(true)
    }
    const Easy=()=>{
        setEasy(true)
        setHard(false)
        setStop(false)
        setStart(false)
        setTurn(true)
    }
    const Swap =()=>{
        setTimer(0)
        setTurn(!yourTurn)
        if(count===last){
            const afk = Math.random()
            if(afk<1/3){
                setCount((l)=>l+1)
                setLast((l)=>l+1)
                if(last+1>=20){
                    setTurn(true)
                }
            }
            else if(afk<2/3){
                setCount((l)=>l+2)
                setLast((l)=>l+2)
                if(last+2>=20){
                    setTurn(true)
                }
            }
            else{
                setCount((l)=>l+3)
                setLast((l)=>l+3)
                if(last+3>=20){
                    setTurn(true)
                }
            }
        }
        else{
            setLast(count)
        }
    }
    const Player =(props)=>{
        return <h1>{props.turn} turn</h1>
    }
    const Counter =(props)=>{
        return(
                <h1 className="counter">{props.count}</h1>
        )
    }
    const How2play=()=>{
        return(
            <div>
                <h1 style={{color:"rgb(0, 153, 255)"}}><b>
                    How to play
                </b></h1>
                <p className="tutorial">
                    1.Select your opponent.<br/>
                        If you win Bot hard in user mode, you'll recieve 10 points<br/>
                        If you win Bot easy in user mode, you'll recieve 2 points<br/>
                    2.Player must count up at least 1 or at most 3 per 1 turn.<br/>
                        If player does not count within 10 seconds,<br/>   computer will random it for you.<br/>
                    3.The game end at count to 20.<br/> The player who count this number is the loser.
                </p>
                <h4>Select your opponent</h4>
                <button type="button" className="btn btn-danger slide" onClick={Hard}>Bot hard</button>
                <button type="button" className="btn btn-primary slide" onClick={Easy}>Bot easy</button>
            </div>)
    }
    const Computerplay= async event=>{
        const delay=ms=> new Promise(
            resolve => setTimeout(resolve,ms)
        )
        var play = Math.random()
        if (play < 1/3){
            await delay(2000)
            setCount(last+1)
        }
        else if(play < 2/3){
            await delay(2000)
            setCount(last+1)
            if(last+2<20){
                await delay(2000)
                setCount(last+2)
            }
        }
        else{
            await delay(2000)
            setCount(last+1)
            if(last+2<20){
                await delay(2000)
                setCount(last+2)
                if(last+3<20){
                    await delay(2000)
                    setCount(last+3)
                }
            }
        }
    }
    const Result=()=>{
        return(
            <div className='result'>
            {yourTurn&&<h1>Computer win!</h1>}
            {!yourTurn&&<h1>You win!</h1>}
            <h1>Score: {score}</h1>
            <button type="button" className="btn btn-primary" onClick={replay}>replay</button>
            </div>
        )
    }
    const press=()=>{
        var newCount = count+1
        setCount(newCount)
    }
    const locktarget= async event=>{
        const delay2=ms2=> new Promise(
            resolve2 => setTimeout(resolve2,ms2)
        )
        var play2 = 0
        if(last<7){play2 = 7-last}
        else if(last<11){play2 = 11-last}
        else if(last<15){play2 = 15-last}
        else if(last<19){play2 = 19-last}
        if (play2 === 1){
            await delay2(2000)
            setCount(last+1)
        }
        else if(play2 === 2){
            await delay2(2000)
            setCount(last+1)
            if(last+2<20){
                await delay2(2000)
                setCount(last+2)
            }
        }
        else{
            await delay2(2000)
            setCount(last+1)
            if(last+2<20){
                await delay2(2000)
                setCount(last+2)
                if(last+3<20){
                    await delay2(2000)
                    setCount(last+3)
                }
            }
        }
    }

    useEffect(()=>{
        if(count-last === 3 && count < 20 && timer !== 10){
          Swap()
        }
      },[count,last])
    useEffect(()=>{
        if(!yourTurn){
            if(easy||(hard&&(last<=3||last===7||last===11||
                last===15||last===19))){
                Computerplay()
            }
            else{locktarget()}
        }
    },[yourTurn])
    useEffect(()=>{
        if(count >= 20){
            setStop(true)
            setTimer(0)
            setCount(0)
            setLast(0)
        }
    },[count])
    useEffect(()=>{
        if(!stop){
            const itv = setInterval(()=>{
                setTimer((t)=>t+1)
            },1000)
            return ()=> clearInterval(itv)
        }
    },[stop])
    useEffect(()=>{
        if(timer===10){
            Swap()
        }
    },[timer])
    useEffect(()=>{
        if(!start&&stop){
            if(!yourTurn){
                if(hard){
                    setScore(10)
                    if(currentUser){
                        updatScore(10)
                    }
                }
                else{
                    setScore(2)
                    if(currentUser){
                        updatScore(2)
                    }
                }
            }
            else{setScore(0)}
        }
    },[stop,start])

    return(
        <div>
        <Navbar/>
        <div className="frame">
            <div className="mainCom">
                {start&&stop&&<How2play/>}
                {!stop&&yourTurn&&<Player turn={"Your"}/>}
                {!stop&&!yourTurn&&<Player turn={"Computer's"}/>}
                {!stop&&<p>press button before it turns red!</p>}
                {!stop&&yourTurn&&<div className='frameCounter'>
                    {true&&<Counter count={count}/>}</div>}
                {!stop&&!yourTurn&&<div className='frameCounter'>
                    {true&&<Counter count={count}/>}</div>}
                {!stop&&yourTurn&&<button className="countBut" onClick={press}>+</button>}
                {!stop&&!yourTurn&&<div style={{height:"140px",width:"0px"}}></div>}
                {/* {!stop&&true&&<button onClick={Swap}>ok</button>} */}
                {!start&&stop&&<Result/>}
                {/* <h1>time {timer}</h1> */}
            </div>
        </div>
        </div>
    )
}
export default Game
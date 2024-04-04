import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'

const AuthorDetails = (props) =>{
    const navigate = useNavigate()
    const firebase = useFirebase()
    const [name,setName] =  useState("");
    const [email,setEmail] = useState("");
    const [pic,setPic] = useState(null);
    const [interest,setInterest] = useState("");

    const handleSubmit = () =>{
        firebase.addAuthor(name,email,pic,interest)
        navigate('/createBlog')
    }

    return(
        <div className = {`absolute top-16 left-1/3 bg-white p-10 rounded-2xl shadow-lg shadow-gray-300 ${props.display ? "visible" : "hidden"}`}> 
            <form onSubmit = {handleSubmit} className = "flex flex-col space-y-3">
                <label> Name </label>
                <input 
                type = "text" required 
                placeholder = "Enter your name" 
                className = "p-3 focus:outline-none border-orange-200 border-2 rounded-lg"
                value = {name}
                onChange ={(e)=>{ setName(e.target.value)}}/>
                <label> Email Id  </label>
                <input 
                type = "email" required 
                placeholder = "Enter your email" 
                className = "p-3 focus:outline-none border-orange-200 border-2 rounded-lg"
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}/>
                <label> Attach Image for profile pic</label>
                <input type = "file" onChange = {(e) => setPic(e.target.files[0])}/>
                <label> Interest/Expertise </label>
                <textarea rows= "5" cols = "30" 
                className = "focus:outline-none border-2 border-orange-200 rounded-lg"
                value = {interest}
                onChange = {(e) => setInterest(e.target.value)}/>
                <button className = "bg-orange-400 w-24 p-4 rounded-full m-auto text-white"> Submit </button>
            </form>


        
        </div>
    )   
}

export default AuthorDetails
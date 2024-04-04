import React,{ useEffect, useState} from "react";
import { useFirebase } from "../context/Firebase";
import { useParams,useNavigate } from "react-router-dom";

const Read = () =>{
    const firebase = useFirebase();
    const params = useParams();
    const [data,setData] = useState(null);
    const [url,setURL] = useState(null);
    const navigate = useNavigate();
    useEffect(() =>{
        firebase.getBlogById(params.id).then((snapshot) => setData(snapshot)).catch((e) => console.log(e))
        console.log("Data: " ,data)
        
    },[])

    useEffect(() =>{
        data && firebase.getImageURL(data.imageUrl).then((url)  => {
            setURL(url)
            console.log("URL: ", url)
        }).catch((e) => console.error(e))
    },[data])

    if(data == null ) return <h1> Loading... </h1>
    return(
        <>
            <div className = "w-2/3 m-auto flex flex-col">

                 <h1 className = 'text-3xl text-center mt-10 font-bold text-red-500'> {data.title} </h1>
                <img src = {url} className = "h-56 rounded-lg mx-auto my-10"/>
                <p className = "text-xl"> {data.content}</p> 
                <button 
                onClick = {(e) => navigate('/dashboard')}
                className = "p-5 bg-red-500 m-auto w-24 text-white font-bold rounded-xl mt-5"> Back </button>
            </div>
        </>
    )
}

export default Read
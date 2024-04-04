import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Card = (props) =>{
    const firebase = useFirebase()
    const navigate = useNavigate()
    const [url,setURL] = useState(null);

    useEffect(() =>{
        console.log( "Image url: " , props.imageUrl)
        firebase.getImageURL(props.imageUrl).then((url)  => {
            setURL(url)
            console.log("URL: ", url)
        })
    },[])

    const handleSubmit = () =>{
        navigate(`/dashboard/view/${props.id}`)
    }
    return(
        <div className = " m-5 rounded-xl w-64 bg-[#ee673d] py-5">
            <img src= {url} alt = "temp"
            className = "h-52 m-auto w-52 rounded-xl"/>
            <h1 className = "text-center text-3xl text-white p-3 font-semibold"> {props.title} </h1>
            <button className = "p-4 bg-white text-[#F98866] text-lg font-bold rounded-full mx-12" onClick = {handleSubmit}> Want to Read </button>
        </div>
    )
}

export default Card;

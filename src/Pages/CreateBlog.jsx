import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
// import AuthorDetails from "../components/AuthorDetails";

const CreateBlog = () =>{
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [image,setImage] = useState("");
    const [active,setActive] = useState(true)
    const [posted,setPosted] = useState(false)
    // const [display,setDisplay] = useState(false)
    
    const createBlog = () =>{
        // setDisplay((display) => !display)
        try{
            firebase.addBlog(title,content,image)
            setPosted((posted) => !posted)
            setTimeout(() =>{
                navigate('/dashboard')
            },3000)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        if(title !== "" && image !== "" && content !== ""){
            setActive(false)
        }
    },[title,content,image])

    return(
        <>
            <div className = {`bg-green-500 max-w-96 absolute p-8 top-1/3 left-1/3 right-12 rounded-3xl text-white font-bold flex justify-center border-4 border-white ${posted ? "visible": "hidden"}`}>
                <span class="material-symbols-outlined pr-3">check_circle</span>
                Successfully Posted
            </div>
            <div className = "w-[650px] bg-[#F98866] h-[600px] m-auto my-10 rounded-lg flex flex-col py-5 px-10 text-white">
                <form onSubmit = {createBlog}>
                    <input 
                    type = "text" required
                    placeholder = "Title of the Blog" 
                    className = "w-full bg-inherit border-b-2 border-white p-2 text-lg focus:outline-none mb-5"
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)} />
                    <label> Choose a pic for your cover image</label><br/>
                    <input 
                    type = "file" required
                    onChange={(e) => setImage(e.target.files[0])}
                    className = "my-5" /><br/>
                    <label> Share your thoughts</label>
                    <textarea 
                    placeholder = "Write your blog"
                    rows = "13" col = "90" 
                    className = "my-3 text-gray-800 h-fit w-full focus: outline-none p-5 rounded-lg"
                    value={content} 
                    onChange={(e)=>setContent(e.target.value)}>
                    </textarea>
                </form>

            </div>
            {/* <AuthorDetails display = {display}/> */}

            <button 
            disabled = {active} 
            className = {`p-4 text-white rounded-full fixed right-1/2 bottom-6 bg-[#F98866] ${active === true ? "bg-[#eaa691]" : "bg-[#F98866]"}`}
            onClick = {createBlog}> Post Blog </button>
        </>
    )
}

export default CreateBlog;
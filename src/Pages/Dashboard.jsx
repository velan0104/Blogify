import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useFirebase } from "../context/Firebase";
import AuthorDetails from "../components/AuthorDetails";

const Dashboard  = () =>{
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [blogs,setBlogs] = useState(null);
    const [display,setDisplay] = useState(null);

    useEffect(()=>{

        firebase.listAllBlogs().then((blog) =>{
              setBlogs(blog.docs)
              console.log("Blog data: " , blog.docs[0].data())
            });
        
    },[])
    
    const createBlog = () =>{
        // if(firebase.author){
        //     navigate('/createBlog')
        // }else{
        //     setDisplay((display) => !display)
        // }
        navigate('/createBlog')
    }

    const signOutUser = () =>{
        if(firebase.isLoggedIn){
        firebase.signOutUser()
        navigate('/')
    }else{
            console.log("No user is there")
        }
       
    }

    if(!firebase.isLoggedIn) navigate('/')

    return(
        <>
            <div className = "w-full h-16 bg-[#F98866] text-white text-2xl flex items-center justify-between p-7">
                <h1 className = "text-3xl font-extrabold">BloggerStop</h1>
                <button className = "text-xl bg-[#F98866] text-white shadow-inner shadow-orange-300 border-2 border-white p-2 rounded-3xl font-bold transition-colors hover:bg-white hover:text-[#F98866]" onClick = {signOutUser}> Sign Out </button>
            </div>
            <div className = "flex flex-wrap">
                {
                    blogs && blogs.map(blog => <Card id = {blog.id} key = {blog.id} {...blog.data()}/>)
                }
            </div>

            <div className = "fixed bottom-16 right-16">
                <button className = "p-5 bg-[#f45626] rounded-full text-white font-bold shadow-lg shadow-gray-400" onClick = {createBlog}> Create Blog  Post </button> 
            </div>
            <AuthorDetails display = {display}/>
        </>
    )
}


export default Dashboard;
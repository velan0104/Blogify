import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';
import img1 from '../images/home2.png'
import img2 from '../images/home.png'
// Pastel Olive Green : "#A1BE95", Salmon Pink: "#F98866"

const Home = () =>{
    const navigate = useNavigate();
    const firebase = useFirebase()

    const handleSubmit = () =>{
        navigate("/login");
    }

    
    
    if(firebase.isLoggedIn) 
        navigate('/dashboard')

    
    return(
        < div className = "overflow-hidden">
            <nav className = "h-16 bg-[#F98866] flex">
                <div className = "text-2xl font-bold text-white my-auto px-10">
                    BloggerStop
                </div>

            </nav>
            <div className = "flex items-center h-[80vh] p-10">
                <div className = 'w-1/2 text-4xl text-[#F98866] space-y-3 font-extrabold'> 
                    <div className = "text-6xl"> Welcome to BloggerStop, </div> 
                    <div>Discover, Create, and Connect </div>
                    <div> through the Power of Words. </div>
                    <button 
                    onClick = {handleSubmit}
                    className = " text-2xl text-white bg-[#F98866] font-medium p-5 relative top-24 left-1/4 rounded-3xl  hover:bg-[#f9505c] text-center"> Get Started <span class="material-symbols-outlined">
                    arrow_right_alt
                    </span></button>
                </div>
                <div className = "w-1/2 mt-10">
                    <img src = {img1} width = "600" height = "600"/>
                </div>
            </div>
        </div>
    )
}

export default Home;
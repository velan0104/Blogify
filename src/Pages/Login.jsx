import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const firebase = useFirebase();
    const navigate = useNavigate();


    const Label = (props) => {
        return (
            <label className="text-xl"> {props.name} </label>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(firebase)
        const result = await firebase.signupUserWithEmailAndPassword(email, password);
        firebase.isLoggedIn = true;
        console.log(result)
        navigate('/dashboard')
    }

    const signWithGoogle = async (e) => {
        await firebase.signInWithGoogle();
        navigate('/dashboard')
    }
    return (
        <div className="bg-[#F98866] h-screen w-full py-12">
            <div className="w-[500px] m-auto bg-gray-100 rounded-2xl shadow-lg shadow-orange-400 px-10 py-12">
                <h1 className="text-3xl font-medium text-center"> Login </h1>
                <form className="m-5 flex flex-col justify-center" onSubmit={handleSubmit}>
                    <Label name="Name" />
                    <input
                        type="text" required
                        placeholder="Enter your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md  my-3 h-10 p-3 focus:outline-none" />
                    <Label name="Email" />
                    <input
                        type="email" required
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md  my-3 h-10 p-3 focus:outline-none" />
                    <Label name="Password" />
                    <input
                        type="password" required
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md  my-3 h-10 p-3 focus:outline-none" />
                    <button className="p-3 bg-[#F98866] my-5 rounded-lg text-white text-xl" > Login </button>
                    <button className="p-3 bg-[#F98866] rounded-lg text-white text-xl" onClick={signWithGoogle}> Sign Up With Google </button>
                </form>
            </div>
        </div>
        
    )
}

export default Login;
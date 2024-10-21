import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './LoginPopup.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios'

function LoginPopup({ setShowLoginPopup }) {
    const [isLogin, setIsLogin] = useState(true);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { url, setToken } = useContext(StoreContext)

    const onLogin = async (e) => {
        e.preventDefault()

        let newUrl = url;
        if (isLogin) {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }


        const response = await axios.post(newUrl, data)
        console.log(response.data);

        if (response.data.success) {
            setToken(response.data.userToken)
            localStorage.setItem("token", response.data.userToken)
            setShowLoginPopup(false)
        } else {
            alert(response.data.message)
        }

    }


    const onChangeHandler = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setData(data => ({ ...data, [name]: value }))

    }


    const toggleState = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                {/* Popup Title */}
                <div className="login-popup-title">
                    <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                    <img onClick={() => setShowLoginPopup(false)} src={assets.cross_icon} alt="Close" />
                </div>

                {/* Input Fields */}
                <div className="login-popup-input">
                    {/* Name field only for Sign Up */}
                    {!isLogin && <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder="Your Name" required />}
                    <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder="Your Email" required />
                    <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder="Your Password" required />
                </div>

                {/* Button Text Changes based on Login or Signup */}
                <button type="submit">{isLogin ? "Login" : "Create Account"}</button>

                {/* Terms and Conditions */}
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {/* Switch between Login/Signup */}
                <p>
                    {isLogin ? "Create a new account!" : "Already have an account?"}{" "}
                    <span onClick={toggleState}>{isLogin ? "Sign Up Here" : "Login Here"}</span>
                </p>
            </form>
        </div>
    );
}

export default LoginPopup;

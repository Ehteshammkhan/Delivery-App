import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

function Navbar({ setShowLoginPopup }) {

    const [menu, setMenu] = useState('home')

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext)

    return (
        <div className="navbar">
            <Link to='/'><img src={assets.logo} alt="logo" className='logo' /></Link>
            <ul className='navbar-menu-parent'>
                <Link to={'/'} onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#exploreMenu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search-icon" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {
                    !token ? <button onClick={() => setShowLoginPopup(true)}>Sign In</button>
                        : <div className='navbar-profile'>
                            <img src={assets.profile_icon} alt="" />
                            <ul className='nav-profle-dropdown'>
                                <li><img src={assets.bag_icon} alt="" /></li>
                                <hr />
                                <li><img src={assets.logout_icon} alt="" /></li>
                            </ul>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar
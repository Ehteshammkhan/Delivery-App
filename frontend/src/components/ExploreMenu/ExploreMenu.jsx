import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

function ExploreMenu({ category, setCategory }) {
    return (
        <div className='explore-menu' id='exploreMenu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Explore our menu and discover a variety of delicious dishes, crafted to satisfy every palate. There's something for everyone to enjoy!</p>
            <div className="explore-menu-list">
                {
                    menu_list.map((item, index) => {
                        return (
                            <div onClick={() => setCategory((prevCategory) => prevCategory === item.menu_name ? "All" : item.menu_name)} key={index} className="explore-menu-list-item">
                                <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu
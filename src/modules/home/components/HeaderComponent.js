import React from "react";
import '../css/header.css'
import { FaSearch } from "react-icons/fa";
const HeaderComponent = () => {
    return(
        <>
            <div className="header-container">
                <div className="avatar-container">
                </div>
                <div className="search-container">
                    <form className="search-user-form" style={{display: 'flex', padding :'12px 16px', width :'100%'}}>
                        <div className="search-user-name">
                            <input placeholder="Input user name" type='text'/>
                        </div>
                        <div className="search-user-btn">
                            <button type="submit"><FaSearch/></button>
                        </div>
                    </form>
                </div>
                <div className="signout-containter">
                    <button>Sign out</button>
                </div>
            </div>
        </>
    )
}

export default HeaderComponent;
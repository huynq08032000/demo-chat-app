import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import LeftComponent from "../components/LeftComponent";
import RightComponent from "../components/RightComponent";
import '../css/index.css'
const MessengerPage = () => {

    return (
        <>
            <div className="messenger-container">
                <HeaderComponent />
                <div className="main-container">
                    <LeftComponent/>
                    <RightComponent/>
                </div>
            </div>


        </>
    )
}

export default MessengerPage;
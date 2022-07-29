import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import LeftComponent from "../components/LeftComponent";
import ConversationComponent from "../components/ConversationComponent";
import '../css/index.css'
const ConversationPage = () => {


    return (
        <>
            <div className="messenger-container">
                <HeaderComponent />
                <div className="main-container">
                    <LeftComponent/>
                    <ConversationComponent/>
                </div>
            </div>


        </>
    )
}

export default ConversationPage;
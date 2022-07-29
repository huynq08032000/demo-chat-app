import React from "react";
import { useParams } from "react-router";
import '../css/index.css'
const ConversationComponent = () =>{
    const param = useParams() 
    return (
        <>
            <div className="right-container">
                <h1>ConversationComponent</h1>
                ConversationPage
                <div>ConversationID : {param.conversationID}</div>
            </div>
        </>
    )
}

export default ConversationComponent;
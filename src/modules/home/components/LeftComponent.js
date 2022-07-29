import React from "react";
import '../css/index.css'
import { auth, db } from "../../../config/firebase";
import useFirestore from "../../../hooks/useFirestore";
import { NavLink } from "react-router-dom";
import { collection, getDocs, where, query, onSnapshot } from 'firebase/firestore'
import '../css/leftComponent.css'
import { BrowserRouter } from 'react-router-dom'
const LeftComponent = () => {
    const [messages, setMessages] = React.useState([])
    let condition = where("users", "array-contains", auth?.currentUser.email)
    console.log(auth?.currentUser.email)
    const loadConversation = async () => {
        const messages = [{}]
        const q = await query(collection(db, "messages"), condition);
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                messages.push({ id: doc.id, name: doc.data().users.filter((name) => { return name !== auth.currentUser.email }) })
            });
            messages.splice(0, 1)
            setMessages(messages)
        });
    }
    React.useEffect(() => {
        loadConversation();
    }, [])
    return (
        <>
            <div className="left-container">
                {messages.map(({ id, name }) => (
                    <div className="message-container" key={id}>
                        <NavLink
                            to={`/conversation/${id}`}
                            className={({ isActive }) => (isActive ? "link-active" : "link")}
                        >
                            {name}
                        </NavLink>
                    </div>
                ))}
            </div>
        </>
    )
}

export default LeftComponent;
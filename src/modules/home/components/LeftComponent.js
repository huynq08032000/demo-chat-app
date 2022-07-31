import React from "react";
import '../css/index.css'
import useFirestore from "../../../hooks/useFirestore";
import { NavLink } from "react-router-dom";
import '../css/leftComponent.css'
import { auth, db } from "../../../config/firebase";
import { messagesStateSelector } from "../../../redux/selector";
import { collection, getDocs, where, query, onSnapshot } from 'firebase/firestore'
import { useDispatch, useSelector } from "react-redux";
import { setMessagesState } from "../../../redux/actions";
import { authStateSelector } from "../../../redux/selector";
const LeftComponent = () => {
    const [messages, setMessages] = React.useState([])
    const authCurrentState = useSelector(authStateSelector)
    const dispatch = useDispatch()
    let condition = where("users", "array-contains", authCurrentState.email)
    const loadConversation = async () => {
        const messages = [{}]
        const q = await query(collection(db, "messages"), condition);
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                messages.push({ id: doc.id, name: doc.data().users.filter((name) => { return name !== authCurrentState.email }) })
            });
            messages.splice(0, 1)
            setMessages(messages)
            dispatch(setMessagesState(messages))
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
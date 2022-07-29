import React from "react";
import { useParams } from "react-router";
import '../css/index.css'
import { auth, db } from "../../../config/firebase";
import { collection, getDoc, where, query, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { TbSend } from "react-icons/tb";

const ConversationComponent = () => {
    const bottomRef = React.useRef(null)
    const currentMessage = React.useRef(null);
    const param = useParams()
    const [contents, setContent] = React.useState([])
    let condition = where("users", "array-contains", auth.currentUser?.email)
    const [msg, setMsg] = React.useState('')
    const loadConversation = async () => {
        const contents = [{}]
        const q = await query(collection(db, "messages"), condition);
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.id == param.conversationID) {
                    contents.push(doc.data().content)
                }
            });
            contents.splice(0, 1)
            setContent(contents[0])
        });
    }
    React.useEffect(() => {
        loadConversation();
        // bottomRef.current.scrollIntoView({behavior: 'smooth'});
    }, [param.conversationID])
    const onSubmit = React.useCallback(
        async () => {
            const addMsg = {
                message: msg,
                userSend: auth.currentUser?.email,
            }
            const contentRef = doc(db, "messages", param.conversationID)
            const docSnap = await getDoc(contentRef);
            if(docSnap.exists()) {
                await updateDoc(contentRef, {
                    content: [...contents, addMsg]
                })
                    .then(() => console.log('Sucess'))
                    .catch(err => console.log(err))
            }
            currentMessage.current.value = "";
        }, [msg])

    return (
        <>
            <div className="right-container">
                <div className="load-message-container">
                    <h1>ConversationComponent</h1>
                    ConversationPage
                    <div>ConversationID : {param.conversationID}</div>
                    {contents.map((i, index) => (
                        <div key={index} className={`conversation-container ${contents[index]?.userSend === auth.currentUser.email ? 'sent' : 'received'}`} >
                            <div className="conversation-content">{contents[index]?.message}</div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
                <div className="send-message-container">
                    <form className="form-send-message-container"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}>
                        <div className="input-message-waraper">
                            <input type='text' placeholder='Input message' ref={currentMessage} value={msg} onChange={e => setMsg(e.target.value)} />
                        </div>
                        <div className="send-message-btn">
                            <button type='submit'><TbSend /></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ConversationComponent;
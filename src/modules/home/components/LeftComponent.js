import React from "react";
import '../css/index.css'
import { auth, db } from "../../../config/firebase";
import useFirestore from "../../../hooks/useFirestore";
const LeftComponent = () => {
    // const conversationsCondition = React.useMemo(() => {
    //     return {
    //         fieldName: 'users',
    //         operator: 'array-contains',
    //         compareValue: auth.currentUser?.email
    //     }
    // })
    // const conversations = useFirestore('messages', conversationsCondition)
    // React.useEffect(()=>{
    // },[])
    // console.log(conversations)
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        try{
            return db.collection('messages').onSnapshot((snapshot) => {
                const postData = [];
                snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
                setPosts(postData);
            });
        }
        catch(error){
            console.log(error)
        }
    }, []);

    console.log(posts);
    return (
        <>
            <div className="left-container">
                LeftComponent
            </div>
        </>
    )
}

export default LeftComponent;
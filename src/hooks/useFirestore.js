import React from "react"
import { db } from "../config/firebase"

const useFirestore = (col, condition) => {
    const [documents, setDocuments] = React.useState([])
    React.useEffect(() =>{
        let collectionRef = db.collection(col).orderBy('creatAt');

        if(condition) {
            if (!condition.compareValue || !condition.compareValue.lenth) {
                return;
            }
            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)
        }

        const unsubscrible = collectionRef.onSnapshot((snapshot) => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id : doc.id
            }))
            setDocuments(documents)
        })
        return unsubscrible
      
    },[col, condition]);
    return documents;
}

export default useFirestore;
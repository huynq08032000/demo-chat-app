const initState = {
    authState : {
        id : '',
        email : '',
        displayName : ''
    },
    messagesState : []
}
const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case 'authState/setAuthState' :{
            return {
                ...state,
                authState : action.payload
            }
        }
        case 'messagesState/setMessagesState' :{
            return {
                ...state,
                messagesState : action.payload
            }
        }
        default:
            return state;
    }

}

export default rootReducer
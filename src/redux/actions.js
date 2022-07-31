export const setAuthState = (data) => {
    return {
        type : 'authState/setAuthState', 
        payload : data
    }
}
export const setMessagesState = (data) => {
    return {
        type : 'messagesState/setMessagesState',
        payload : data
    }
}
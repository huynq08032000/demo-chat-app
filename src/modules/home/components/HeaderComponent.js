import React from "react";
import '../css/header.css'
import { FaSearch } from "react-icons/fa";
import { auth, db } from "../../../config/firebase";
import { useNavigate } from "react-router";
import { fetchSignInMethodsForEmail } from "firebase/auth"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar } from "@mui/material";
import { stringAvatar } from "../utils";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { collection, addDoc, getDoc } from "firebase/firestore";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const HeaderComponent = () => {
    const nameCurrentUser = auth.currentUser.displayName
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('')
    const handleClose = () => setOpen(false);
    const signOut = () => {
        console.log('Signout')
        auth.signOut()
        navigate('/')
    }
    const handleSearch = React.useCallback(async (userEmail) => {
        if (userEmail === '' || auth.currentUser.email === userEmail) return;
        setLoading(true)
        try {
            let signInMethods = await fetchSignInMethodsForEmail(auth, userEmail);
            if (signInMethods.length === 0) {
                toast.error("Hiện không có tài khoản này", {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                setOpen(true)
            }
        }
        catch (err) {
            toast.error("Địa chỉ email không hợp lệ", {
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setLoading(false)
    }, [userEmail])

    const handleSend = () => {
        if (msg == "") return;
        handleAddConversation(userEmail, msg)
    }
    const handleAddConversation = React.useCallback(async (userEmail, msg) => {
        const userSend = auth.currentUser.email
        const docRef = await addDoc(collection(db, "messages"), {
            content: [{ message: msg, userSend: userSend }],
            users: [userSend, userEmail]
        });
        navigate('/messenger')
    }, [userEmail, msg])
    return (
        <>
            <div className="header-container">
                <div className="avatar-container">
                    <Avatar {...stringAvatar({ nameCurrentUser })} sx={{ width: '60px', height: '100%' }} />
                </div>
                <div className="search-container">
                    <form className="search-user-form" style={{ display: 'flex', padding: '12px 16px', width: '100%' }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch(userEmail);
                        }}>
                        <div className="search-user-name">
                            <input placeholder="Input user name" type='text'
                                onChange={(e) => {
                                    setUserEmail(e.target.value)
                                }} />
                        </div>
                        <div className="search-user-btn">
                            <button type="submit" disabled={loading}><FaSearch /></button>
                        </div>
                    </form>
                </div>
                <div className="signout-containter">
                    <Button variant="contained" startIcon={<ExitToAppIcon/>} sx={{ height: '44px' }}
                        onClick={signOut}
                    >Sign out</Button>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Send to {userEmail}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <TextField id="outlined-basic" label="Send your message" multiline variant="outlined" sx={{ width: '70%' }}
                            onChange={(e) => {
                                setMsg(e.target.value)
                            }} />
                        <Button variant="contained" endIcon={<SendIcon />} sx={{ height: '44px' }}
                            onClick={handleSend}
                        >
                            Send
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default HeaderComponent;
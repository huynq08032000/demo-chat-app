import React from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import { signInWithEmailAndPassword } from "firebase/auth"
import '../css/index.css'
import { auth } from "../../../config/firebase";
import { ACCESS_TOKEN_KEY } from "../../../ultils/constants";
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setAuthState } from "../../../redux/actions";
const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const onLogin = React.useCallback(
        async (values) => {
            setErrorMessage('');
            setLoading(true);
            try {
                const user = await signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                );
                dispatch(setAuthState({
                    id : user.user.uid,
                    email : user.user.email,
                    displayName : user.user.displayName
                }))
                Cookies.set(ACCESS_TOKEN_KEY, user.user.accessToken, { expires: values.rememberMe ? 7 : undefined })
                navigate('/messenger')
            } catch (error) {
                toast.error("Sai tài khoản, mật khẩu", {
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
        }, []
    );
    return (
        <div className="container">
            <div className="container-form">
                <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
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
        </div>
    )
}

export default LoginPage;
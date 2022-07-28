import React from "react";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm";
import {signInWithEmailAndPassword} from "firebase/auth"
import '../css/index.css'
import { auth } from "../../../config/firebase";
const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const onLogin = React.useCallback(
        async(values)=>{
            setErrorMessage('');
            setLoading(true);
            try {
                const user = await signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password                   
                );
                navigate('/messenger')
            } catch (error) {
               setErrorMessage("Sai tài khoản, mật khẩu")
            } 
            setLoading(false)   
        },[]    
    );
    return (
        <div className="container">
            <div className="container-form">
                <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage}/>
            </div>
            
        </div>
    )
}

export default LoginPage;
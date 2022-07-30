import React from "react";
import RegisterForm from "../components/RegisterForm";
import '../css/index.css';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegisterPage = () => {
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const onRegister = React.useCallback(
        async (values) => {
            setErrorMessage('');
            setLoading(true);
            try {
                await createUserWithEmailAndPassword(auth, values.email, values.password).catch((err) => {
                    toast.error("Email-already-in-use", {
                        position: "top-right",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                );
                await sendEmailVerification(auth.currentUser).catch((err) =>
                    console.log(err)
                );
                await updateProfile(auth.currentUser, { displayName: values.displayName }).catch(
                    (err) => console.log(err)
                );
            } catch (error) {
            }
            setLoading(false)
        }, []
    );
    return (
        <>
            <div className="container">
                <div className="container-form">
                    <RegisterForm onRegister={onRegister} loading={loading} errorMessage={errorMessage} />
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
        </>
    )
}

export default RegisterPage;
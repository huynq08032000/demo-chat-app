import React from "react";
import RegisterForm from "../components/RegisterForm";
import '../css/index.css';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router";
const RegisterPage = () => {
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const onRegister = React.useCallback(
        async (values) => {
            setErrorMessage('');
            // setLoading(true);
            try {
                await createUserWithEmailAndPassword(auth, values.email, values.password).catch((err) =>
                    console.log(err)
                );
                await sendEmailVerification(auth.currentUser).catch((err) =>
                    console.log(err)
                );
                await updateProfile(auth.currentUser, { displayName: values.displayName }).catch(
                    (err) => console.log(err)
                );
            } catch (error) {
                console.log(error.message);
            }
        }, []
    );
    return (
        <>
            <div className="container">
                <div className="container-form">
                    <RegisterForm onRegister={onRegister} loading={loading} errorMessage={errorMessage} />
                </div>
            </div>
        </>
    )
}

export default RegisterPage;
import React, { useState } from "react";
import { validateRegister, validRegister } from "../utils";
const RegisterForm = (props) => {
    const { onRegister, loading, errorMessage } = props;
    const [formValues, setFormvalues] = useState({ displayName : '' ,email: '', password: '', rePassword: '' })
    const [validate, setValidate] = useState({ displayNameMessage : '' , emailMessage: '', passwordMessage: '', rePasswordMessage: '' });
    const onSubmit = React.useCallback(() => {
        const validate = validateRegister(formValues);
        setValidate(validate)
        if (!validRegister(validate)) {
            return;
        }
        onRegister(formValues)
    }, [formValues])

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}>
                <div className="form-header">
                    <span>CHAT APP</span>
                </div>
                <div className="form-body">
                    <div className="input-wrap">
                        <label className="input-label">
                            Diplay Name
                        </label>
                        <input type='text' name="displayName" value={formValues.displayName}
                            onChange={(e) => {
                                setFormvalues({ ...formValues, displayName: e.target.value })
                            }}
                        ></input>
                        <div className='error-message'>{validate.displayNameMessage}</div>
                    </div>
                    <div className="input-wrap">
                        <label className="input-label">
                            Email
                        </label>
                        <input type='text' name="email" value={formValues.email}
                            onChange={(e) => {
                                setFormvalues({ ...formValues, email: e.target.value })
                            }}
                        ></input>
                        <div className='error-message'>{validate.emailMessage}</div>
                    </div>
                    <div className="input-wrap">
                        <label className="input-label">
                            Password
                        </label>
                        <input type='password' name="password" value={formValues.password}
                            onChange={(e) => {
                                setFormvalues({ ...formValues, password: e.target.value })
                            }}
                        ></input>
                        <div className='error-message'>{validate.passwordMessage}</div>
                    </div>
                    <div className="input-wrap">
                        <label className="input-label">
                            Re-password
                        </label>
                        <input type='password' name="rePassword" value={formValues.rePassword}
                            onChange={(e) => {
                                setFormvalues({ ...formValues, rePassword: e.target.value })
                            }}
                        ></input>
                        <div className='error-message'>{validate.rePasswordMessage}</div>
                    </div>
                </div>
                <div className="form-footer" style={{ paddingTop: '0' }}>
                    <div className="submit-btn">
                        <button type="submit">Register</button>
                    </div>
                </div>
            </form>
            <div className="direct">
                <a href="/">
                    Or sign in
                </a>
            </div>

        </>

    )
}

export default RegisterForm;
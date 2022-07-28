import React, { useState } from "react";
import { validateLogin, validLogin} from "../utils";
const LoginForm = (props) => {
    const {onLogin, loading, errorMessage} = props;
    const [formValues, setFormvalues] = useState({ email: '', password: '', rememberMe: false })
    const [validate, setValidate] = useState({emailMessage : '', passwordMessage : ''});
    const onSubmit = React.useCallback(()=>{
        const validate = validateLogin(formValues);
        setValidate(validate)
        if(!validLogin(validate)){
            return;
        }
        onLogin(formValues)
    },[formValues])

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
                    <div className="error-message">
                        {errorMessage}
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
                </div>
                <div className="form-footer" style={{ paddingTop: '0' }}>
                    <div className="flex">
                        <div className="input-checkbox">
                            <input type='checkbox' style={{ margin: "5px" }} value={formValues.rememberMe}
                                onChange={(e) => {
                                    setFormvalues({ ...formValues, rememberMe: e.target.checked })
                                }}
                            ></input>
                            <label>Remember Me</label>
                        </div>
                        <div>
                            <a href="/forgotPassword">Forgot Password?</a>
                        </div>
                    </div>
                    <div className="submit-btn">
                        <button type="submit" disabled={loading}>Login</button>
                    </div>
                </div>
            </form>
            <div className="direct">
                <a href="/register">
                    Or sign up
                </a>
            </div>

        </>

    )
}

export default LoginForm;
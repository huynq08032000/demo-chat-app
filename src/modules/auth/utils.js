const validEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const validateEmail = (email) => {
    if (!email) return 'Vui lòng nhập địa chỉ email';
    if (!validEmailRegex.test(email)) return 'Địa chỉ email không hợp lệ';
    return '';
}

const validatePassword = (password) => {
    if (!password) return 'Vui lòng nhập mật khẩu';
    if (password.length < 6) return 'Mật khẩu tối thiểu 6 kí tự';
    return "";

}

const validateRePassword = (password, rePassword) => {
    if (!rePassword) return 'Vui lòng nhập mật khẩu';
    if ( password !== rePassword ) return 'Xác nhận mật khẩu không khớp'
    return '';
}

const validateDisplayName = (displayName) => {
    if (!displayName) return 'Vui lòng nhập tên hiển thị';
    return '';
}

export const validateLogin = (value) => {
    return {
        emailMessage : validateEmail(value.email),
        passwordMessage : validatePassword(value.password),
    }
}
export const validLogin = (value) => {
    return !value.emailMessage && !value.passwordMessage;
}

export const validateRegister = (value) => {
    return { 
        displayNameMessage : validateDisplayName(value.displayName),
        emailMessage : validateEmail(value.email),
        passwordMessage : validatePassword(value.password),
        rePasswordMessage : validateRePassword(value.password,value.rePassword),
    }
}
export const validRegister = (value) => {
    return !value.displayNameMessage && !value.emailMessage && !value.passwordMessage && !value.rePasswordMessage;
}
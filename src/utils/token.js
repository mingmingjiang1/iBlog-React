export function getToken() {
    var token = window.localStorage.getItem('token');
    if (token) {
        return token;
    }
    return null;
}

export function setToken(token) {
    window.localStorage.setItem('token', token)
}

export function clearToken() {
    window.localStorage.removeItem('token');
}

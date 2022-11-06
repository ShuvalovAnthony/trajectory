import { } from 'solid-js';


export function Logout() {
    fetch('http://127.0.0.1:8000/auth/token/logout', {
        method: 'POST',
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            'Authorization': "Token " + window.localStorage.getItem("AuthToken"),
        },
    })
    window.localStorage.clear();
    window.location.href = '/';
    console.log('Success logout');
}

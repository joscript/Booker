export function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") == 'true';
}

export function login() {
    localStorage.setItem("isLoggedIn", true);
}

export function logout() {
    localStorage.setItem("isLoggedIn", false);
}
import conf from "../conf/conf";
import { toast } from "react-toastify";

export class AuthenticationService {
    headers = { "Content-Type": "application/json" };

    async register({ name, email, password }) {
        const body = JSON.stringify({ name, email, password });
        const result = await fetch(`${conf.apiUrl}/user/register`, {
            method: "POST",
            body,
            headers: this.headers,
        });
        const status = await result.status;
        if (status === 201) {
            return this.login({ email, password });
        } else {
            const { message } = await result.json();
            toast.error(message, conf.toastOptions);
            return false;
        }
    }

    async login({ email, password }) {
        const body = JSON.stringify({ email, password });
        const result = await fetch(`${conf.apiUrl}/user/login`, {
            method: "POST",
            body,
            headers: this.headers,
        });
        const { message, user, token } = await result.json();
        if (token) {
            localStorage.setItem("token", token);
            toast.success("User login successful", conf.toastOptions);
            return { user };
        } else {
            toast.error(message, conf.toastOptions);
            return false;
        }
    }

    async profile() {
        const token = localStorage.getItem("token");
        const result = await fetch(`${conf.apiUrl}/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const response = await result.json();
        return response;
    }

    async changePassword({ oldPassword, newPassword, confirmPassword }) {
        const token = localStorage.getItem("token");
        const body = JSON.stringify({ oldPassword, newPassword, confirmPassword });
        const result = await fetch(`${conf.apiUrl}/user/password`, {
            method: "PATCH",
            body,
            headers: { ...this.headers, Authorization: `Bearer ${token}` },
        });
        const response = await result.json();
        if (result.ok) {
            toast.success(response.message, conf.toastOptions);
            return true;
        } else {
            toast.error(response.message, conf.toastOptions);
            return false;
        }
    }

    async forgotPassword({ email }) {
        const result = await fetch(`${conf.apiUrl}/user/password/forgot`, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: this.headers,
        });
        const response = await result.json();
        if (result.ok) {
            toast.success("Reset password link sent.", conf.toastOptions);
            return true;
        } else {
            toast.error(response.message, conf.toastOptions);
            return false;
        }
    }

    async resetPassword({ token, newPassword, confirmPassword }) {
        const result = await fetch(`${conf.apiUrl}/user/password/reset`, {
            method: "POST",
            body: JSON.stringify({ token, newPassword, confirmPassword }),
            headers: this.headers,
        });
        const response = await result.json();
        if (result.ok) {
            toast.success("Password resetted successfully.", conf.toastOptions);
            return true;
        } else {
            toast.error(response.message, conf.toastOptions);
            return false;
        }
    }
}

export const authService = new AuthenticationService();

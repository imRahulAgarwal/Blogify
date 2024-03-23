import conf from "../conf/conf";
import { toast } from "react-toastify";

export class BlogService {
    async getBlogs(page, userid = "") {
        const token = localStorage.getItem("token");
        let url = `${conf.apiUrl}/blogs?page=${page}`;

        if (userid) url += `&userid=${userid}`;
        const result = await fetch(url, {
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        const response = await result.json();
        return response;
    }

    async getBlog(blogId, userid = "") {
        const token = localStorage.getItem("token");
        let url = `${conf.apiUrl}/blogs/${blogId}`;

        if (userid) url += `?userid=${userid}`;
        const result = await fetch(url, {
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        const response = await result.json();
        if (result.ok) return response;
        else {
            toast.error(response.message, conf.toastOptions);
            return false;
        }
    }

    async addBlog(formData) {
        const token = localStorage.getItem("token");
        const result = await fetch(`${conf.apiUrl}/user/blogs`, {
            method: "POST",
            body: formData,
            headers: { Authorization: `Bearer ${token}` },
        });
        const { message } = await result.json();
        if (result.ok) {
            toast.success(message, conf.toastOptions);
            return true;
        } else {
            toast.error(message, conf.toastOptions);
            return false;
        }
    }

    async updateBlog(blogId, formData) {
        const token = localStorage.getItem("token");
        const result = await fetch(`${conf.apiUrl}/user/blogs/${blogId}`, {
            method: "PUT",
            body: formData,
            headers: { Authorization: `Bearer ${token}` },
        });
        const { message } = await result.json();
        if (result.ok) {
            toast.success(message, conf.toastOptions);
            return true;
        } else {
            toast.error(message, conf.toastOptions);
            return false;
        }
    }

    async changeBlogStatus(blogId, status) {
        const token = localStorage.getItem("token");
        const result = await fetch(`${conf.apiUrl}/user/blogs/${blogId}`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        const { message } = await result.json();
        if (result.ok) {
            toast.success(message, conf.toastOptions);
            return true;
        } else {
            toast.error(message, conf.toastOptions);
            return false;
        }
    }

    async deleteBlog(blogId) {
        const token = localStorage.getItem("token");
        const result = await fetch(`${conf.apiUrl}/user/blogs/${blogId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        const { message } = await result.json();
        if (result.ok) {
            toast.success(message, conf.toastOptions);
            return true;
        } else {
            toast.error(message, conf.toastOptions);
            return false;
        }
    }
}

export const blogService = new BlogService();

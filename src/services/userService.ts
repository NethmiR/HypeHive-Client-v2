import axiosInstance from "@/utils/axiosInstance";
import {
    CreateUserInterface
} from "@/interfaces/userInterfaces";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//create user
export const createUser = async (data: CreateUserInterface, imageFile: File) => {
    try {
        const formData = new FormData();
        formData.append("UserName", data.UserName);
        formData.append("Email", data.Email);
        formData.append("DOB", data.DOB.toISOString());
        formData.append("imageFile", imageFile);
        const response = await axiosInstance.post(`${BASE_URL}/users/register`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
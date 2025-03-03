import axiosInstance from "@/utils/axiosInstance";
import {
    CreateUserInterface,
    UserInterface,
} from "@/interfaces/userInterfaces";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//create user
export const createUser = async (data: CreateUserInterface, imageFile: File) => {
    try {
        console.log("inside the service page");
        const formData = new FormData();
        formData.append("UserName", data.UserName);
        formData.append("Email", data.Email);
        formData.append("DOB", data.DOB.toISOString());
        formData.append("imageFile", imageFile);
        console.log("inside the service page", formData);
        const response = await axiosInstance.post(`${BASE_URL}/users/register`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("inside the service page", response.data);
        return response.data as UserInterface;
    } catch (error) {
        throw error;
    }
};
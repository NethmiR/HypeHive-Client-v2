import axios from "axios";
import Router from "next/router";
import {
    BadRequestException,
    ForbiddenException,
    InternalServerException,
    NotFoundException,
    NotAcceptableException,
    UnauthorizedException,
    UnexpectedException
} from "@/utils/exceptions";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("printing response from axios instance", response);
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status == 401 || error.response.status == 403) {
                Router.push("/error-page");
            } else {
                switch (error.response.status) {
                    case 400:
                        throw new BadRequestException(error.response.data.message);
                    case 404:
                        throw new NotFoundException("Resource not found");
                    case 500:
                        throw new InternalServerException("Internal server error");
                    case 406:
                        throw new NotAcceptableException("Not Acceptable");
                    default:
                        throw new UnexpectedException("An unexpected error occurred");
                }
            }
        } else {
            throw new UnexpectedException("No response from server");
        }
    }
);

export default axiosInstance;

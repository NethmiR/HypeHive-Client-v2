import React, { useState } from "react";
import Link from "next/link";
import ImageUpload from "@/components/ImageUpload";
import { createUser } from "@/services/userService";
import { CreateUserInterface } from "@/interfaces/userInterfaces";
import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const SignUp: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [dob, setDob] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const router = useRouter();

    const handleSignUp = async () => {
        if (!username || !email || !dob || !imageFile) {
            toast.error("Please fill all fields including image", {
                className: "bg-red-500 text-white",
            });
            return;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email", {
                className: "bg-red-500 text-white",
            });
            setEmail("");
            return;
        }
        setLoading(true);
        const userData: CreateUserInterface = {
            UserName: username,
            Email: email,
            DOB: new Date(dob),
        };
        try {
            await createUser(userData, imageFile);
            toast.success("Sign up successful");
            router.push("/signIn");
        } catch (error) {
            toast.error("Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 text-black">
            <div className="bg-white bg-opacity-10 rounded-xl p-4 sm:px-10 w-80 sm:w-96 h-auto flex flex-col items-center justify-center space-y-2 relative">
                <img src="/img/logo.png" alt="logo" className="w-40" />
                <h1 className="text-lg font-semibold text-white">Sign Up</h1>
                <div className="w-full h-0.5 bg-white opacity-20"></div>
                <div className="w-full mt-4">
                    <TextBox caption="Username" value={username} placeholder="Enter username" onChange={(e) => setUsername(e)} />
                    <TextBox caption="Email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e)} />
                    <TextBox caption="Date of Birth" value={dob} placeholder="Enter date of birth" type="date" onChange={(e) => setDob(e)} />
                    <div className="mt-4">
                        <ImageUpload onImageSelect={setImageFile} />
                    </div>
                    <div className="flex flex-col items-center justify-center mt-4">
                        <Button caption="SIGN UP" onClick={handleSignUp} width="w-full" background="bg-red-500" />
                        <Link href="/signIn">
                            <div className="mb-4 mt-2 text-white text-sm hover:text-red-500 cursor-pointer">Already have an account? Sign In</div>
                        </Link>
                    </div>
                </div>
            </div>
            <Toast />
            <Spinner isVisible={loading} />
        </div>
    );
};

export default SignUp;

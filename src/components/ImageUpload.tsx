import React, { useState } from "react";
import Button from "@/components/Button";

interface ImageUploadProps {
    onImageSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImagePreview(URL.createObjectURL(file));
            setFileName(file.name);
            onImageSelect(file);
        }
    };

    return (
        <div className="w-full border border-gray-300 rounded-lg p-3 flex items-center justify-between bg-white">
            {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" className="w-14 h-14 rounded-full object-cover" />
            ) : (
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">No Image</div>
            )}
            <div className="flex flex-col items-end">
                <input type="file" accept="image/*" id="fileInput" className="hidden" onChange={handleImageChange} />
                <Button caption="Choose a Picture" onClick={() => document.getElementById("fileInput")?.click()} background="bg-blue-500" />
                {fileName && <p className="text-sm text-gray-600 mt-1">{fileName}</p>}
            </div>
        </div>
    );
};

export default ImageUpload;
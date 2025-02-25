import React, { useState } from "react";

interface ImageUploadProps {
    onImageSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImagePreview(URL.createObjectURL(file));
            onImageSelect(file);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Image Preview" width="100" />}
        </div>
    );
};

export default ImageUpload;

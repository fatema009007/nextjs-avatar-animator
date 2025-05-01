'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
    onAvatarChange: (avatarUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onAvatarChange }) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [animatedAvatar, setAnimatedAvatar] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [quality, setQuality] = useState<string>('medium');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'];
            
            if (!validImageTypes.includes(selectedFile.type)) {
                setError('Please upload a valid image (JPEG, PNG, GIF, WEBP)');
                return;
            }

            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('quality', quality);

        try {
            const response = await fetch('/api/animate', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            
            if (response.ok) {
                console.log('Generated Avatar URL:');
                setAnimatedAvatar(data.animatedAvatarUrl);
                onAvatarChange(data.animatedAvatarUrl);
            } else {
                setError(data.error || 'Failed to animate the image');
            }
        } catch (error) {
            setError('Error uploading the image. Please try again.');
            console.error('Error uploading the image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="image-uploader">
            <div className="flex flex-col gap-4">
                <label className="flex flex-col items-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 hover:bg-gray-100">
                    <span className="text-base text-gray-600">Click to upload an image</span>
                    <span className="text-sm text-gray-500 mt-1">(JPEG, PNG, GIF, WEBP)</span>
                    <input 
                        type="file" 
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quality Settings</label>
                    <select
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="low">Standard (1024x1024)</option>
                        <option value="medium">Wide (1024x1536)</option>
                        <option value="high">Tall (1536x1024)</option>
                    </select>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {preview && (
                        <div className="preview-container">
                            <h3 className="text-lg font-semibold mb-2">Original Image</h3>
                            <div className="preview-image-container">
                                <Image 
                                    src={preview}
                                    alt="Preview"
                                    width={500}
                                    height={500}
                                    className="preview-image"
                                    priority
                                />
                            </div>
                        </div>
                    )}

                    {animatedAvatar && (
                        <div className="preview-container">
                            <h3 className="text-lg font-semibold mb-2">Generated Avatar</h3>
                            <div className="preview-image-container">
                                <Image 
                                    src={animatedAvatar}
                                    alt="Generated Avatar"
                                    width={500}
                                    height={500}
                                    className="preview-image"
                                    priority
                                />
                            </div>
                        </div>
                    )}
                </div>

                <button 
                    onClick={handleUpload} 
                    disabled={loading || !file}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        loading || !file 
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Generating Avatar...
                        </span>
                    ) : 'Generate Animated Avatar'}
                </button>
            </div>
        </div>
    );
};

export default ImageUploader;
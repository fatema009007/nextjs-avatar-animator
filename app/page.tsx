'use client';

import { useState } from 'react';
import ImageUploader from './components/ImageUploader';

export default function Home() {
  const [avatar, setAvatar] = useState<string | null>(null);

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar);
  };

  return (
    <div className="flex flex-col items-center">
      <ImageUploader onAvatarChange={handleAvatarChange} />
    </div>
  );
}
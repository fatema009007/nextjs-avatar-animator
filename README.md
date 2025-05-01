# Next.js Avatar Animator

A web application built with Next.js that transforms profile photos into professional digital avatars using AI image generation.

## Features

- Upload images in various formats (JPEG, PNG, GIF, WEBP)
- Transform photos into professional digital avatars
- Preview original and generated images side by side
- Save generated avatars locally
- Responsive design

## Tech Stack

- Next.js
- TypeScript
- OpenAI API (DALL-E)
- Sharp for image processing
- Tailwind CSS

## Project Structure

```
nextjs-avatar-animator
├── app
│   ├── api
│   │   └── animate
│   │       └── route.ts        # API route for image processing
│   ├── components
│   │   └── ImageUploader.tsx    # Component for uploading images
│   ├── globals.css              # Global styles for the application
│   ├── layout.tsx               # Layout component for the application
│   └── page.tsx                 # Main entry point of the application
├── public                        # Directory for static assets
├── package.json                 # npm configuration file
├── next.config.js               # Next.js configuration file
├── tsconfig.json                # TypeScript configuration file
└── README.md                    # Project documentation
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key

## License

MIT
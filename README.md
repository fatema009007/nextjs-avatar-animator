# Next.js Avatar Animator

This project is a Next.js application that allows users to upload an employee image and receive an animated avatar in return. The application consists of a simple interface for image uploading and an API that processes the image to create an animated avatar.

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

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nextjs-avatar-animator.git
   cd nextjs-avatar-animator
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Use the image uploader to select an employee image. Once uploaded, the application will process the image and display the animated avatar.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
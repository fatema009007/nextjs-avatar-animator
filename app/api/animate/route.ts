import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function POST(request: Request) {
    console.log('Form Data: Fatema')

    try {
        const requestFormData = await request.formData();
        const image = requestFormData.get('image') as File;

        if (!image) {
            return NextResponse.json({ error: 'No image provided' }, { status: 400 });
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Process image: resize to square, ensure PNG format
        const processedBuffer = await sharp(buffer)
            .resize(1024, 1024) // DALL-E requires square image
            .png() // Ensure PNG format
            .toBuffer();

        // Create a transparent mask of the same size
        const maskBuffer = await sharp({
            create: {
                width: 1024,
                height: 1024,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        })
        .png()
        .toBuffer();

        // Create form data for OpenAI API
        const apiFormData = new FormData();
        apiFormData.append('image', new Blob([processedBuffer], { type: 'image/png' }), 'image.png');
        //apiFormData.append('mask', new Blob([maskBuffer], { type: 'image/png' }), 'mask.png');
        //apiFormData.append('prompt', 'Generate a digital avatar of the person in the reference image, preserving their gender, facial features, clothing style, colors, and accessories. The background should be a well-lit, modern office space with computers, glass partitions, and professionally dressed Bangladeshi people working in the background. The style should be clean, semi-realistic with smooth shading and subtle detail, suitable for a professional website. Make the person appear warm and friendly.');
        apiFormData.append('prompt', "Create a semi-realistic digital avatar of the person from the reference image, preserving their gender, facial features, clothing style, colors, and accessories. Transform them into a clean, professional illustration style with smooth shading and semi-realistic proportions. Place the avatar in a modern office environment with glass partitions, bright lighting, and professionally dressed Bangladeshi colleagues working at computers in the background. The background should be slightly blurred to keep focus on the subject. The overall style should be polished and appropriate for a professional website, similar to corporate illustration art. The subject should wear professional attire that complements their appearance, positioned front-facing with a friendly, confident expression. The avatar should preserve the person's unique characteristics while creating a warm, approachable professional representation.");
        apiFormData.append('model', 'gpt-image-1');
        apiFormData.append('quality', 'medium');
        apiFormData.append('n', '1');


        console.log('Sending request to OpenAI...');
console.log('Form Data: Fatema')
        const response = await fetch('https://api.openai.com/v1/images/edits', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: apiFormData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenAI API Error Details:", errorData);
            throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log('OpenAI Response:', JSON.stringify(result, null, 2));

        const base64Image = result.data?.[0]?.b64_json;

        if (!base64Image) {
            throw new Error('No base64 image data received from OpenAI');
        }
        
        // Decode base64 to buffer
        const generatedImageBuffer = Buffer.from(base64Image, 'base64');
        
        // Save it to file
        const filename = `avatar_${Date.now()}.png`;
        const savedImagePath = path.join(process.cwd(), 'public', 'images', 'generated', filename);
        await writeFile(savedImagePath, generatedImageBuffer);

        //const imageUrl = result.data[0].url;
        
        // Download the generated image
        // const imageResponse = await fetch(imageUrl);
        // if (!imageResponse.ok) {
        //     throw new Error(`Failed to download generated image: ${imageResponse.statusText}`);
        // }

        // const imageArrayBuffer = await imageResponse.arrayBuffer();
        // const imageBuffer = Buffer.from(imageArrayBuffer);

        // // Save the image
        // const filename = `avatar_${Date.now()}.png`;
        // const outputPath = path.join(process.cwd(), 'public', 'images', 'generated', filename);
        // await writeFile(outputPath, imageBuffer);

        return NextResponse.json({
            success: true,
            animatedAvatarUrl: `/images/generated/${filename}`
        });

    } catch (error: any) {
        console.error('Error in image edit process:', error);
        return NextResponse.json(
            { 
                error: error.message || 'Image edit failed',
                details: error.toString()
            },
            { status: 500 }
        );
    }
}
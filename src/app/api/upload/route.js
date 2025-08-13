import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configura Cloudinary con las credenciales de tu archivo .env.local
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: "No se ha subido ningún archivo." }, { status: 400 });
  }

  // Convierte el archivo en un buffer para poder subirlo
  const fileBuffer = await file.arrayBuffer();
  const mime = file.type;
  const encoding = 'base64';
  const base64Data = Buffer.from(fileBuffer).toString('base64');
  const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

  try {
    // Sube el archivo a Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'nudos-del-alma', // Opcional: organiza las subidas en una carpeta
    });

    // Devuelve la URL segura de la imagen subida
    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("Error al subir a Cloudinary:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
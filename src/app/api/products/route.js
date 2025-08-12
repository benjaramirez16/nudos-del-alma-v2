import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Esta es la función GET que ya teníamos para leer todos los productos
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("nudosdelalma_db");

    const products = await db
      .collection("products")
      .find({})
      .sort({ _id: -1 }) // Ordenamos para ver los más nuevos primero
      .toArray();

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// AÑADIMOS LA NUEVA FUNCIÓN POST PARA CREAR PRODUCTOS
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("nudosdelalma_db");
    const newProduct = await request.json(); // Leemos los datos del nuevo producto que nos envía el formulario

    // Usamos insertOne para guardar el nuevo producto en la colección
    const result = await db.collection("products").insertOne(newProduct);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
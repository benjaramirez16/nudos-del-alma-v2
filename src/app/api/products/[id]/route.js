import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, context) {
  try {
    const client = await clientPromise;
    const db = client.db("nudosdelalma_db");

    const id = context.params.id;

    const product = await db.collection("products").findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      return NextResponse.json({ success: false, error: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    // Añadimos un console.log para ver el error exacto en la terminal si algo falla
    console.error("Error en la API de producto individual:", error);
    return NextResponse.json({ success: false, error: "Error del servidor" }, { status: 500 });
  }
}
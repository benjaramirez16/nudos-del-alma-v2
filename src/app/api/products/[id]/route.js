import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// --- Función para LEER un solo producto (GET) ---
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
    console.error("Error en la API de producto individual (GET):", error);
    return NextResponse.json({ success: false, error: "Error del servidor" }, { status: 500 });
  }
}

// --- Función para ELIMINAR un solo producto (DELETE) ---
export async function DELETE(request, context) {
  try {
    const client = await clientPromise;
    const db = client.db("nudosdelalma_db");
    const id = context.params.id;

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Producto eliminado" });
  } catch (error) {
    console.error("Error en la API de producto individual (DELETE):", error);
    return NextResponse.json({ success: false, error: "Error del servidor" }, { status: 500 });
  }
}

// --- Función para ACTUALIZAR un solo producto (PUT) ---
export async function PUT(request, context) {
  try {
    const client = await clientPromise;
    const db = client.db("nudosdelalma_db");
    const id = context.params.id;
    const updatedData = await request.json();

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error("Error en la API de producto individual (PUT):", error);
    return NextResponse.json({ success: false, error: "Error del servidor" }, { status: 500 });
  }
}
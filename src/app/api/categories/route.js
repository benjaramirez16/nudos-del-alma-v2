import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb'; // Importante para buscar por _id

// --- GET: Obtener todas las categorías ---
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("nudosdelalma_db");
    const categories = await db
      .collection("categories")
      .find({})
      .sort({ createdAt: -1 }) // Ordenar por fecha de creación descendente
      .toArray();

    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 });
  }
}

// --- POST: Crear una nueva categoría ---
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("nudosdelalma_db");
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ success: false, error: 'El nombre es requerido' }, { status: 400 });
    }

    const newCategory = {
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("categories").insertOne(newCategory);

    return NextResponse.json({ success: true, data: result.ops[0] || { _id: result.insertedId, ...newCategory } }, { status: 201 });

  } catch (error) {
    // Código 11000 significa "violación de índice único"
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'Ya existe una categoría con ese nombre' }, { status: 409 });
    }
    console.error("Error al crear la categoría:", error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}

// --- PUT: Actualizar una categoría ---
export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db("nudosdelalma_db");
    const { _id, name } = await request.json();

    if (!_id || !name) {
      return NextResponse.json({ success: false, error: 'Se requiere el ID y el nuevo nombre' }, { status: 400 });
    }

    const result = await db.collection("categories").findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: { name, updatedAt: new Date() } },
      { returnDocument: 'after' } // Devuelve el documento ya actualizado
    );

    if (!result.value) {
      return NextResponse.json({ success: false, error: 'Categoría no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result.value }, { status: 200 });
  } catch (error) {
     if (error.code === 11000) {
      return NextResponse.json({ success: false, error: 'Ya existe otra categoría con ese nombre' }, { status: 409 });
    }
    console.error("Error al actualizar la categoría:", error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}

// --- DELETE: Eliminar una categoría ---
export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db("nudosdelalma_db");
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get('_id');

    if (!_id) {
      return NextResponse.json({ success: false, error: 'Se requiere el ID de la categoría' }, { status: 400 });
    }

    const result = await db.collection("categories").deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Categoría no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Categoría eliminada' }, { status: 200 });
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}
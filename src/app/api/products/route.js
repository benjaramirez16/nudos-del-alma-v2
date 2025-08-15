import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Necesitamos la conexión directa para escribir
import { getProducts } from '@/lib/data'; // Mantenemos esto para el GET

// --- Función GET para LEER todos los productos ---
export async function GET(request) {
  // Esta función ahora usa nuestra librería de datos, es más limpia
  const result = await getProducts();
  
  if (result.success) {
    return NextResponse.json(result);
  } else {
    return NextResponse.json(result, { status: 500 });
  }
}

// --- Función POST para CREAR un nuevo producto (LA QUE FALTABA) ---
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("nudosdelalma_db");
    const newProduct = await request.json();

    const result = await db.collection("products").insertOne(newProduct);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
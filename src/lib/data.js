// src/lib/data.js
import clientPromise from '@/lib/mongodb';

export async function getProducts() {
  try {
    const client = await clientPromise;
    const db = client.db("nudosdelalma_db");

    const products = await db
      .collection("products")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    // Devolvemos los datos en un formato consistente
    return { success: true, data: products };
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return { success: false, error: "Falló la carga de productos" };
  }
}
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Variable de entorno inválida/faltante: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // En modo de desarrollo, usamos una variable global para preservar el valor
  // a través de las recargas de módulos causadas por HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En modo de producción, es mejor no usar una variable global.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Exporta una promesa del cliente de MongoDB con alcance de módulo. Al hacer esto en un
// módulo separado, el cliente puede ser compartido entre funciones.
export default clientPromise;

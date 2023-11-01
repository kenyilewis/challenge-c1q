import mongoose from 'mongoose';
import 'dotenv/config'

const uri = `${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`;

let connectionDB: typeof mongoose | null = null;

export const connectMongoDB = async () => {
  try {
    if (connectionDB === null) {
      console.info(`Creating new connection to the database....${uri}` );
      connectionDB = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.info('Conexión a MongoDB exitosa: ', uri);
      // return connectionDB
    }
    console.info(
      "Connection already established, reusing the existing connection"
    );
  } catch (error) {
    console.error('Error de conexión a MongoDB:', JSON.stringify(error));
    throw error;
  }
};

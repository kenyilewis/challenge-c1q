import mongoose from 'mongoose';

const environments = {
	local: 'localhost',
	docker: 'mongodb-server'
};

const dbNames = {
	local: 'local-burger-queen',
	docker: 'dock-burger-queen'
};
// TODO install dot.env
// const host = environments[enviroment] || 'localhost';
// const dbName = dbNames[enviroment] || 'local-burger-queen';
const host = 'localhost';
const databaseName = 'test';

const uri = process.env.MONGO_URL || `mongodb://${host}:27017/${databaseName}`;

// const options = {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// };

export const connectMongoDB = async () => {
	try {
		await mongoose.connect(uri);
		console.info('Conexión a MongoDB exitosa: ', uri);

	} catch(error) {
		console.error('Error de conexión a MongoDB:', JSON.stringify(error));
		throw error;
	}
};


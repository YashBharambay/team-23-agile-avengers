const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =
	'mongodb+srv://ridhampatel:<Ridham_1234>@cluster0.3qh5fed.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function connectToDatabase() {
	try {
		await client.connect();
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
}

async function closeDatabaseConnection() {
	try {
		await client.close();
		console.log('Closed MongoDB connection');
	} catch (error) {
		console.error('Error closing MongoDB connection:', error);
	}
}

module.exports = {
	connectToDatabase,
	closeDatabaseConnection,
	getClient: () => client,
};

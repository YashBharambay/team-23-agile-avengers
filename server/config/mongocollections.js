const connection = require('./mongoConnection');

async function getCollectionFn(str) {
	const client = connection.getClient();
	const db = client.db('Agile23');
	const collection = db.collection(str);
	return collection;
}

module.exports = {
	patients: getCollectionFn('patients'),
	doctors: getCollectionFn('doctors'),
};

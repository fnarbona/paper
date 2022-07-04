import mongoose from 'mongoose';

let uri = process.env.MONGODB_URI;

let cachedClient = null;

if (!uri) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	);
}

export async function connectToDatabase() {
	if (cachedClient) {
		return { client: cachedClient };
	}

	const client = await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	cachedClient = client;
	return client;
}

// FOR USE WITHOUT MONGOOSE =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/*

import { MongoClient } from 'mongodb';

let uri = process.env.MONGODB_URI;
// let dbName = process.env.MONGODB_DB;

let cachedClient = null;
let cachedDb = null;

if (!uri) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	);
}

// if (!dbName) {
// 	throw new Error(
// 		'Please define the MONGODB_DB environment variable inside .env.local'
// 	);
// }

export async function connectToDatabase() {
	if (cachedClient && cachedDb) {
		return { client: cachedClient, db: cachedDb };
	}

	const client = await MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	const db = await client.db();

	cachedClient = client;
	cachedDb = db;

	return { client, db };
}

*/

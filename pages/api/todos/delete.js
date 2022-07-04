import { connectToDatabase } from '../../../lib/mongodb';
import Todo from '../../../models/todoModel';

export default async function addTest(req, res) {
	try {
		console.log('CONNECTING TO MONGO');
		await connectToDatabase();
		console.log('CONNECTED TO MONGO');

		console.log('DELETING DOCUMENT');
		const todo = await Todo.deleteOne(req.body);
		console.log('DELETED DOCUMENT', todo);

		res.json({ todo });
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
}

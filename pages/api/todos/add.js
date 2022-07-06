import { connectToDatabase } from '../../../lib/mongodb';
import Todo from '../../../models/todoModel';

export default async function addTodo(req, res) {
	try {
		console.log('CONNECTING TO MONGO');
		await connectToDatabase();
		console.log('CONNECTED TO MONGO');

		console.log('CREATING DOCUMENT');
		const todo = await Todo.create(req.body);
		console.log('CREATED DOCUMENT', todo);

		res.json({ todo });
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
}

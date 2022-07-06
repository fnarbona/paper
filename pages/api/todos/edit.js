import { connectToDatabase } from '../../../lib/mongodb';
import Todo from '../../../models/todoModel';

export default async function editTodo(req, res) {
	const { _id, update } = req.body;
	const options = { new: true };

	try {
		console.log('CONNECTING TO MONGO');
		await connectToDatabase();
		console.log('CONNECTED TO MONGO');

		console.log('UPDATING DOCUMENT');
		const todo = await Todo.findByIdAndUpdate(_id, update, options);
		console.log('UPDATED DOCUMENT', todo);

		res.json({ todo });
	} catch (error) {
		console.log(error);
		res.json({ error });
	}
}

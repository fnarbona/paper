import { useEffect, useRef, useState } from 'react';
import { connectToDatabase } from '../lib/mongodb';
import {
	Center,
	Heading,
	HStack,
	Icon,
	Input,
	Text,
	VStack,
	useToast,
} from '@chakra-ui/react';
import Page from '../components/Page';
import Alert from '../components/Alert';
import { FiEdit, FiTrash } from 'react-icons/fi';

import Todo from '../models/todoModel';

export default function Home({ todos, error = false }) {
	// console.log('TODOS: ', todos);
	const [todosList, setTodosList] = useState(todos);
	const [newTodoError, setNewTodoError] = useState(false);
	const [editTodoError, setEditTodoError] = useState(false);
	const [editModeIndex, setEditModeIndex] = useState(null);

	// hooks
	const inputNewRef = useRef();
	const inputEditRef = useRef();
	const toast = useToast();

	useEffect(() => {
		window.addEventListener('keydown', e => {
			if (e.key === 'Escape' || e.key === 'Enter') setEditModeIndex(null);
		});
		return () => window.removeEventListener('keydown');
	}, []);

	useEffect(() => {
		return () => {};
	}, []);

	useEffect(() => {
		if (editModeIndex) document.getElementById(editModeIndex).focus();
	}, [editModeIndex]);

	const handleChangeNewTodo = e => {
		e.preventDefault();
		if (newTodoError) setNewTodoError(false);
	};

	const handleChangeEditTodo = e => {
		e.preventDefault();
		if (editTodoError) setEditTodoError(false);
	};

	const handleAddTodo = async e => {
		// e.preventDefault();
		if (e.key !== 'Enter') return;

		const { value } = e.target;
		if (value === '') {
			setNewTodoError(true);
			toast({
				position: 'top',
				render: () => (
					<Alert status='error' message='Enter some text first!' />
				),
			});
			return;
		}

		const newTodo = await fetch('/api/todos/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: value,
			}),
		})
			.then(res => res.json())
			.then(({ todo }) => todo)
			.catch(err => console.log('ERROR ADD TODO: ', err));

		console.log('NEW TODO: ', newTodo);

		if (newTodo) {
			setTodosList([...todosList, newTodo]);
		} else {
			toast({
				position: 'top',
				render: () => (
					<Alert
						status='error'
						message='Something went wrong, please try again!'
					/>
				),
			});
		}
		document.getElementById('input-new-todo').value = '';
	};

	const handleEditTodo = async (e, todo) => {
		// e.preventDefault();
		if (e.key === 'Escape') {
			setEditModeIndex(null);
			return;
		}

		if (e.key !== 'Enter') return;

		const { value } = e.target;
		if (value === '') {
			setEditTodoError(true);
			toast({
				position: 'top',
				render: () => (
					<Alert status='error' message='Enter some text first!' />
				),
			});
			return;
		}

		if (value === todo.title) {
			setEditModeIndex(null);
			return;
		}

		const updatedTodo = await fetch('/api/todos/edit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: todo._id,
				update: { title: value },
			}),
		})
			.then(res => res.json())
			.then(({ todo }) => todo)
			.catch(err => console.log('ERROR UPDATE TODO: ', err));

		console.log('UPDATE SUCCESFUL: ', updatedTodo);

		if (updatedTodo) {
			const editTodoIndex = todosList.findIndex(t => t._id === todo._id);
			// (?) for some reason the code commented below doesn't work (?)
			// const updatedTodosList = todosList;
			// updatedTodosList[editTodoIndex] = updatedTodo;

			setTodosList([
				...todosList.slice(0, editTodoIndex),
				updatedTodo,
				...todosList.slice(editTodoIndex + 1),
			]);
		} else {
			toast({
				position: 'top',
				render: () => (
					<Alert
						status='error'
						message='Something went wrong, please try again!'
					/>
				),
			});
		}

		setEditModeIndex(null);
	};

	const handleDeleteTodo = async id => {
		const deleteSuccessful = await fetch('/api/todos/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
			}),
		})
			.then(res => res.json())
			.then(({ todo }) => todo.deletedCount > 0)
			.catch(err => console.log('ERROR DELETE TODO: ', err));

		// console.log('DELETE SUCCESFUL: ', deleteSuccessful);
		if (deleteSuccessful) {
			setTodosList(todosList.filter(todo => todo._id !== id));
		} else {
			toast({
				position: 'top',
				render: () => (
					<Alert
						status='error'
						message='Something went wrong, please try again!'
					/>
				),
			});
		}
	};

	const toggleEditMode = id => {
		if (editModeIndex === id) {
			setEditModeIndex(null);
		} else {
			setEditModeIndex(id);
		}
	};

	return (
		<Page title={'Just like Paper'} bg={'white'} bgImage={'/paper.jpg'}>
			<Center flexDir={'column'} h='100%' mt={10} mb={20}>
				<Heading textAlign={'center'} mb={10}>
					Paper. {editModeIndex}
				</Heading>
				{error && (
					<Alert status={'error'} message={'Something went wrong.'} />
				)}
				{!error && (
					<VStack
						borderRadius={5}
						h={'80vh'}
						w={'800px'}
						m={'auto'}
						p={10}
						bg={'gray.50'}
						boxShadow={'lg'}>
						<HStack
							mb={4}
							w={'100%'}
							borderRadius={5}
							justify={'space-between'}
							_hover={{ bg: 'gray.300' }}>
							<Input
								id={'input-new-todo'}
								ref={inputNewRef}
								isInvalid={newTodoError}
								placeholder='New todo'
								bg={'white'}
								onChange={handleChangeNewTodo}
								onKeyDown={handleAddTodo}
							/>
						</HStack>
						{todosList.map(todo => (
							<HStack
								key={todo._id}
								mb={2}
								p={3}
								w={'100%'}
								borderRadius={5}
								border={'1px solid'}
								borderColor={'gray.300'}
								justify={'space-between'}
								_hover={{ bg: 'gray.300' }}>
								{editModeIndex === todo._id ? (
									<Input
										id={todo._id}
										ref={inputEditRef}
										isInvalid={editTodoError}
										h={'150%'}
										p={0}
										bg={'white'}
										border={'none'}
										defaultValue={todo.title}
										onChange={handleChangeEditTodo}
										onKeyDown={e => handleEditTodo(e, todo)}
									/>
								) : (
									<Text>{todo.title}</Text>
								)}
								<HStack>
									<Icon
										onClick={() => toggleEditMode(todo._id)}
										as={FiEdit}
										mr={2}
										w={6}
										h={6}
										color={'gray.400'}
									/>
									<Icon
										onClick={() =>
											handleDeleteTodo(todo._id)
										}
										as={FiTrash}
										mr={2}
										w={6}
										h={6}
										color={'gray.400'}
									/>
								</HStack>
							</HStack>
						))}
					</VStack>
				)}
			</Center>
		</Page>
	);
}

export async function getServerSideProps() {
	try {
		const client = await connectToDatabase();

		// const todos = await db.collection('todos').find({}).limit(20).toArray();
		const todos = await Todo.find();

		console.log('TODOS: ', todos ? true : false);
		return {
			props: { todos: JSON.parse(JSON.stringify(todos)) },
		};
	} catch (e) {
		console.error(e);
		return {
			props: { todos: [], error: true },
		};
	}
}

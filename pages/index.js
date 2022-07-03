import { useRef, useState } from 'react';
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

export default function Home({ todos, error = false }) {
	const [todosList, setTodosList] = useState(todos);
	const [inputError, setInputError] = useState(false);

	// hooks
	const inputRef = useRef();
	const toast = useToast();

	const handleInputChange = e => {
		e.preventDefault();
		if (inputError) setInputError(false);
	};

	const handleAddTodo = e => {
		// e.preventDefault();
		if (e.key !== 'Enter') return;

		const newTodo = { title: e.target.value };
		if (newTodo.title === '') {
			setInputError(true);
			toast({
				position: 'top',
				render: () => (
					<Alert status='error' message='Enter some text first!' />
				),
			});
			return;
		}
		setTodosList([...todosList, newTodo]);
	};

	const handleEditTodo = e => {};
	const handleDeleteTodo = e => {};

	return (
		<Page title={'Just like Paper'} pt={10} bg={'gray.100'}>
			<Center flexDir={'column'} h='100%'>
				<Heading textAlign={'center'} mb={5}>
					Paper.
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
						bg={'gray.200'}
						boxShadow={'lg'}>
						<HStack
							mb={4}
							w={'100%'}
							borderRadius={5}
							justify={'space-between'}
							_hover={{ bg: 'gray.300' }}>
							<Input
								ref={inputRef}
								// value={inputValue}
								isInvalid={inputError}
								placeholder='New todo'
								bg={'white'}
								onChange={handleInputChange}
								onKeyDown={handleAddTodo}
							/>
						</HStack>
						{todosList.map(t => (
							<HStack
								key={t.title}
								mb={2}
								p={3}
								w={'100%'}
								borderRadius={5}
								border={'1px solid'}
								borderColor={'gray.300'}
								justify={'space-between'}
								_hover={{ bg: 'gray.300' }}>
								<Text>{t.title}</Text>
								<HStack>
									<Icon
										onClick={handleEditTodo}
										as={FiEdit}
										mr={2}
										w={6}
										h={6}
										color={'gray.400'}
									/>
									<Icon
										onClick={handleDeleteTodo}
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
		const { db } = await connectToDatabase();

		const todos = await db.collection('todos').find({}).limit(20).toArray();

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

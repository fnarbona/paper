import { connectToDatabase } from '../lib/mongodb';
import { Alert, Box, Heading, Icon, VStack } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';
import Page from '../components/page';

export default function Home({ todos, error = false }) {
	return (
		<Page title={'Just like Paper'} pt={10} bg={'gray.100'}>
			<Heading textAlign={'center'} mb={5}>
				Paper.
			</Heading>
			{error && (
				<Alert status='error' w={'500px'} m={'auto'} color={'red.500'}>
					<Icon
						as={FiAlertTriangle}
						mr={2}
						w={6}
						h={6}
						color={'red.500'}
					/>
					Something went wrong.
				</Alert>
			)}
			{!error && (
				<VStack>
					{todos.map(t => (
						<Box>{t.title}</Box>
					))}
				</VStack>
			)}
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

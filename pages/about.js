import Head from 'next/head';
import clientPromise from '../lib/mongodb';

export default function Home({ isConnected }) {
	return (
		<Page title={'Just like Paper'}>
			<Flex justify={'center'} p={20}>
				<Heading>Paper.</Heading>
			</Flex>
		</Page>
	);
}

export async function getServerSideProps(context) {
	try {
		await clientPromise;
		// `await clientPromise` will use the default database passed in the MONGODB_URI
		// However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
		//
		// `const client = await clientPromise`
		// `const db = client.db("myDatabase")`
		//
		// Then you can execute queries against your database like so:
		// db.find({}) or any of the MongoDB Node Driver commands

		return {
			props: { isConnected: true },
		};
	} catch (e) {
		console.error(e);
		return {
			props: { isConnected: false },
		};
	}
}

import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';

export default function Page({ title, children, ...rest }) {
	return (
		<Flex
			flexDir={'column'}
			minH={'100vh'}
			justify='space-between'
			{...rest}>
			<Head>
				<title>{title}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main data-testid={'main-container'}>{children}</main>

			{/* <Box
				w={'full'}
				h={'100px'}
				bg={'white'}
				justifySelf='flex-end'></Box> */}
		</Flex>
	);
}

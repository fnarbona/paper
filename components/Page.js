import { Box, Flex, HStack, Text } from '@chakra-ui/react';
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

			<main>{children}</main>

			<HStack w={'full'} h={'60px'} bg={'white'} justifySelf='flex-end'>
				<Text m='auto'>Made with a passion for simplicity</Text>
			</HStack>
		</Flex>
	);
}

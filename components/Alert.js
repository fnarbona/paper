import { Alert, Icon } from '@chakra-ui/react';
import { FiCheckCircle, FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';

export default function AlertComp({ status, message, ...rest }) {
	const icon =
		status === 'success'
			? FiCheckCircle
			: status === 'warning'
			? FiAlertCircle
			: FiAlertTriangle;

	const textColor =
		status === 'success'
			? 'green.500'
			: status === 'warning'
			? 'yellow.500'
			: 'red.500';

	return (
		<Alert
			status={status}
			w={'500px'}
			m={'auto'}
			color={textColor}
			borderRadius={5}
			{...rest}>
			<Icon as={icon} mr={2} w={6} h={6} color={textColor} />
			{message}
		</Alert>
	);
}

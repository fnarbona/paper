import { render, screen } from '@testing-library/react';
import Alert from '../../components/Alert';
import '@testing-library/jest-dom';

describe('Alert', () => {
	it('renders an alert', () => {
		render(<Alert status={'success'} message={'test message'} />);

		const alert = screen.getByText('test message');

		expect(alert).toBeInTheDocument();
	});
});

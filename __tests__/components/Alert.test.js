import { render, screen } from '@testing-library/react';
import Alert from '../../components/Alert';
import '@testing-library/jest-dom';

describe('Alert', () => {
	it('renders a success message', () => {
		render(<Alert status={'success'} message={'success message'} />);

		const alert = screen.getByText('success message');

		expect(alert).toBeInTheDocument();
	});

	it('renders a warning message', () => {
		render(<Alert status={'warning'} message={'warning message'} />);

		const alert = screen.getByText('warning message');

		expect(alert).toBeInTheDocument();
	});

	it('renders a error message', () => {
		render(<Alert status={'error'} message={'error message'} />);

		const alert = screen.getByText('error message');

		expect(alert).toBeInTheDocument();
	});
});

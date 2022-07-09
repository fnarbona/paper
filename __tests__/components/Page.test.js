import { render, screen } from '@testing-library/react';
import Page from '../../components/Page';
import '@testing-library/jest-dom';

describe('Page', () => {
	it('renders Page', () => {
		render(<Page />);

		const page = screen.getByTestId('main-container');

		expect(page).toBeInTheDocument();
	});

	it('renders children', () => {
		render(
			<Page>
				<div data-testid={'datatest-id'}></div>
			</Page>
		);

		const page = screen.getByTestId('datatest-id');

		expect(page).toBeInTheDocument();
	});
});

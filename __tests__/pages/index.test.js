import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../pages/index';
import '@testing-library/jest-dom';

const mockTodosList = [
	{ _id: Math.random() * 100000, title: 'test todo' },
	{ _id: Math.random() * 100000, title: 'test todo' },
	{ _id: Math.random() * 100000, title: 'test todo' },
];

describe('Home', () => {
	it('renders a heading', () => {
		render(<Home todos={[]} />);

		const heading = screen.getByRole('heading', {
			name: /Paper./i,
		});

		expect(heading).toBeDefined();
	});

	it('renders 3 todos', () => {
		render(<Home todos={mockTodosList} />);

		const todos = screen.getAllByText('test todo');

		expect(todos).toHaveLength(3);
	});

	it('renders no todos when list is empty', () => {
		render(<Home todos={[]} />);

		const todos = screen.queryByText('test todo');

		waitFor(() => {
			expect(todos).not.toBeDefined();
		});
	});

	it('renders error message when SSR for todos returns an error', () => {
		render(<Home todos={[]} error={true} />);

		const alert = screen.getByTestId('alert-error');

		expect(alert).toBeDefined();
	});
});

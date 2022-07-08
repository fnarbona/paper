import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '../../pages/index';
import '@testing-library/jest-dom';

const mockTodosList = [
	{ _id: '123', title: 'test todo' },
	{ _id: '456', title: 'test todo' },
	{ _id: '789', title: 'test todo' },
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

	todo('enters edit mode for a todo', () => {});
	todo('exits edit mode before saving changes for todo', () => {});
	todo('saves edits made to todo', () => {});
	todo('deletes todo', () => {});
	todo('adds todo', () => {});
});

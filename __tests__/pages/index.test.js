import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '../../pages/index';
import '@testing-library/jest-dom';

// mock add api routes
jest.mock('../../pages/api/todos/add', () => {
	return {
		__esModule: true,
		default: jest.fn(newTodo =>
			Promise.resolve({ _id: '135', ...newTodo })
		),
	};
});
jest.mock('../../pages/api/todos/edit', () => {
	return {
		__esModule: true,
		default: jest.fn(() => Promise.resolve({ _id: '135', ...updatedTodo })),
	};
});
jest.mock('../../pages/api/todos/delete', () => {
	return {
		__esModule: true,
		default: jest.fn(() => Promise.resolve(true)),
	};
});

const mockTodosList = [
	{ _id: '123', title: 'test todo' },
	{ _id: '456', title: 'test todo' },
	{ _id: '789', title: 'test todo' },
];

describe('Home', () => {
	test('renders heading', () => {
		render(<Home todos={mockTodosList} />);

		const heading = screen.getByRole('heading', {
			name: /Paper./i,
		});

		expect(heading).toBeDefined();
	});

	test('renders todos', () => {
		render(<Home todos={mockTodosList} />);

		const todos = screen.getAllByText('test todo');

		expect(todos).toHaveLength(3);
	});

	test('renders no todos', () => {
		render(<Home todos={[]} />);

		const todos = screen.queryByText('test todo');

		waitFor(() => {
			expect(todos).not.toBeDefined();
		});
	});

	test('renders error message', () => {
		render(<Home todos={[]} error={true} />);

		const alert = screen.getByTestId('alert-error');

		expect(alert).toBeDefined();
	});

	test('add todo', () => {
		render(<Home todos={mockTodosList} />);

		// click edit
		const inputNew = screen.getByTestId('input-new-todo');
		fireEvent.change(inputNew, { target: { value: 'new todo' } });
		fireEvent.keyDown(inputNew, { key: 'Escape' });
		const todo = screen.queryByText('new todo');

		waitFor(() => {
			expect(todo).toBeInTheDocument();
		});
	});

	test('delete todo', () => {
		render(<Home todos={mockTodosList} />);

		// click edit
		const deleteIcon = screen.getByTestId('icon-delete-789');
		fireEvent.click(deleteIcon);

		const todo = screen.queryByTestId('icon-delete-789');

		waitFor(() => {
			expect(todo).not.toBeInTheDocument();
		});
	});

	test('edit todo', () => {
		render(<Home todos={mockTodosList} />);

		// input new todo title
		const inputNew = screen.getByTestId('input-new-todo');
		fireEvent.change(inputNew, { target: { value: 'new todo' } });
		fireEvent.keyDown(window, { key: 'Enter' });

		// check new todo
		const newTodo = screen.queryByText('new todo');

		waitFor(() => {
			expect(newTodo).toBeInTheDocument();
		});
	});

	test('edit todo cancel', () => {
		render(<Home todos={mockTodosList} />);

		// click edit
		const editIcon = screen.getByTestId('icon-edit-789');
		fireEvent.click(editIcon);

		// cancel edit
		const input = screen.getByTestId('input-edit-789');
		fireEvent.keyDown(window, { key: 'Escape' });

		expect(input).not.toBeInTheDocument();
	});
});

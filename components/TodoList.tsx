// Framer motion
import { FC, Suspense } from 'react';
import TodoItem from '@/components/TodoItem';
// import loadFeatures from "@/utils/features"

import prisma from '@/lib/prismaClient';

const fetchData = async () => {
	try {
		const todos = await prisma.todo.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			select: {
				id: true,
				task: true,
			},
		});

		return todos;
	} catch (error) {
		console.error(error);
		throw new Error('Error fetching data from database');
	}
};

const TodoList = async () => {
	const todosData = await fetchData();
	return (
		<Suspense fallback='loading'>
			{/* {typeof todosData !== 'string' ? ( */}
			<TodoItem todosData={todosData} />
			{/* ) : (
				<p>Something Went Wrong</p>
			)} */}
		</Suspense>
	);
};

export default TodoList;

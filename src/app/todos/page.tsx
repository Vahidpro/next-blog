import { Suspense } from "react";
import { getTodos } from "../api/todos";
import { TodoItem } from "../components/TodoItem";
import { Skeleton, SkeletonList } from "../components/Skeleton";

export default function Page() {
	return (
		<>
			<h1 className="page-title">Todos</h1>
			<ul>
				<Suspense
					fallback={
						<SkeletonList amount={10}>
							<li>
								<Skeleton short />
							</li>
						</SkeletonList>
					}
				></Suspense>
				<TodoList />
			</ul>
		</>
	);
}

async function TodoList() {
	const todos = await getTodos();

	return todos.map((todo) => (
		<TodoItem
			key={todo.id}
			{...todo}
		/>
	));
}

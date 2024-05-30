import { getTodos } from "../api/todos";
import { TodoItem } from "../components/TodoItem";

export default async function Page() {
	const todos = await getTodos();
	return (
		<>
			<ul>
				{todos.map((todo) => (
					<TodoItem
						key={todo.id}
						{...todo}
					/>
				))}
			</ul>
		</>
	);
}

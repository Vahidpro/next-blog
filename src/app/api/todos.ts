type Todo = {
	id: number;
	title: string;
	completed: boolean;
};
export function getTodos() {
	return fetch(`${process.env.API_URL}/todos`)
		.then((res) => res.json())
		.then((data) => data as Todo[]);
}

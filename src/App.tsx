import {useDocument, useLiveQuery} from "use-fireproof";
import "./App.css";

function App() {
  const response = useLiveQuery('date', {limit: 10, descending: true})
  const todos = response.docs
  const [todo, setTodo, saveTodo] = useDocument(() => ({
    text: "",
    date: Date.now(),
    completed: false,
  }))

  return (
    <>
      <input
        title="text"
        type="text"
        value={todo.text as string}
        onChange={(e) => setTodo({text: e.target.value})}
      />
      <button
        onClick={async () => {
          await saveTodo()
          setTodo()
        }}
      >
        Save
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              title="completed"
              type="checkbox"
              checked={todo.completed as boolean}
              onChange={() =>
                useLiveQuery.database.put({
                  ...todo,
                  completed: !todo.completed,
                })}
            />
            {todo.text as string}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App

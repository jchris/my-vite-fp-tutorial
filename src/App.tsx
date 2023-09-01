import './App.css'
import { fireproof, connect, useLiveQuery, useDocument } from 'use-fireproof'

const otherDb = fireproof('mims')

function App() {
  const response = useLiveQuery('date')
  const todos = response.docs
  const [todo, setTodo, saveTodo] = useDocument({ text: '', date: Date.now(), completed: false })
  // connect.web3(useLiveQuery.database, 'jchris+vite-test@fireproof.storage')
  useLiveQuery.database.changes().then((changes) => {
    // console.log(changes)
  })
  console.log('otherDb', otherDb)
  return (
    <>
      <div>
        <input
          title="text"
          type="text"
          value={todo.text as string}
          onChange={e => setTodo({ text: e.target.value })}
        />
        <button
          onClick={e => {
            e.preventDefault()
            saveTodo()
            setTodo(false)
          }}
        >
          Save
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <input
              title="completed"
              type="checkbox"
              checked={todo.completed as boolean}
              onChange={() => useLiveQuery.database.put({ ...todo, completed: !todo.completed })}
            />
            {todo.text as string}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App

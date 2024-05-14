import TodoItem from "./TodoItem";

function Todolist({ todos, toggleTodo, deleteTodo, editTodo }) {
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      {todos?.map((todo) => {
        return (
          <TodoItem
            id={todo.id}
            completed={todo.completed}
            title={todo.title}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}            
          />
        );
      })}
    </ul>
  );
}

export default Todolist;

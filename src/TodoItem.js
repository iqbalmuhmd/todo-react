function TodoItem({ completed, id, title, toggleTodo, deleteTodo, editTodo }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button className="btn btn-primary" onClick={() => editTodo(id)}>
        Edit
      </button>
      <button className="btn btn-danger" onClick={() => deleteTodo(id)}>
        X
      </button>
    </li>
  );
}

export default TodoItem;

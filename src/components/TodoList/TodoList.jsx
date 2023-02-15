import Todo from "../Todo/Todo";
import "./TodoList.css";

const TodoList = ({ todos, onChangeDone, onDelete }) => {
  return (
    <ul className="todoList">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          date={todo.expiryDate}
          isDone={todo.isDone}
          onChangeDone={onChangeDone}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
export default TodoList;

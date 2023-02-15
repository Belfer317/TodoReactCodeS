import classes from "./Todo.module.css";

const Todo = ({ id, date, title, isDone, onChangeDone, onDelete }) => (
  <li className={classes.todo}>
    <span>{title}</span> <span>{date}</span>
    <input
      type="checkbox"
      name="isDone"
      id={id}
      checked={isDone ? true : false}
      onChange={() => {
        onChangeDone(id);
      }}
    />
    <button className={classes.button} onClick={() => onDelete(id)}>
      x
    </button>
  </li>
);

export default Todo;

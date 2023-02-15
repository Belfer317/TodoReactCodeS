import { useRef } from "react";
import classes from "./TodoForm.module.css";

const TodoForm = ({ addTodo }) => {
  const todoTitleRef = useRef(null);
  const todoDateExpiryRef = useRef(null);
  const todoInfo = useRef(null);

  const onSubmitHandler = (evt) => {
    evt.preventDefault();

    let enteredTitle = todoTitleRef.current.value;
    let enteredExpiryDate = todoDateExpiryRef.current.value;
    if (enteredTitle && enteredExpiryDate) {
      const newEnteredTodo = {
        title: enteredTitle,
        expiryDate: enteredExpiryDate
      };

      addTodo(newEnteredTodo);

      todoInfo.current.innerHTML = `Dodałeś: <b>"${enteredTitle}"</b>, data wykonania: <b>${enteredExpiryDate}</b>`;
      todoInfo.current.className = classes.info;

      todoTitleRef.current.value = "";
      todoDateExpiryRef.current.value = "";
    } else {
      todoInfo.current.innerText = "Wprowadź poprawne dane!";
      todoInfo.current.className = classes.error;
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <h2 className={classes.form__title}>Nowe zadanie</h2>
      <label htmlFor="titleTodo" className={classes.form__label}>
        Zadanie:
        <input
          type="text"
          id="titleTodo"
          placeholder="Wprowadź treść zadania"
          size={50}
          ref={todoTitleRef}
          className={classes.form__input}
        />
      </label>
      <label htmlFor="titleDateExpiry" className={classes.form__label}>
        Data:
        <input
          type="date"
          id="DateExpiry"
          ref={todoDateExpiryRef}
          className={classes.form__input}
        />
      </label>
      <button>dodaj</button>
      <p ref={todoInfo} className={classes.info}>
        &nbsp;
      </p>
    </form>
  );
};

export default TodoForm;

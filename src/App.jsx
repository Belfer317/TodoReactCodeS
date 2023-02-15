import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import "./styles.css";

// const TODOS = [
//   {
//     id: "ldccg46a",
//     title: "Zrób coś",
//     expiryDate: "2023-01-28",
//     isDone: false
//   },
//   {
//     id: "ldccg46b",
//     title: "Zrób coś innego",
//     expiryDate: "2023-01-30",
//     isDone: true
//   },
//   {
//     id: "ldccg46d",
//     title: "Idź gdzieś",
//     expiryDate: "2023-01-20",
//     isDone: false
//   },
//   {
//     id: "ldccg46e",
//     title: "Posprzątaj pokój",
//     expiryDate: "2023-01-29",
//     isDone: false
//   }
// ];

export let today = new Date();

export default function App() {
  const [todos, setTodos] = useState([]);

  // const [newTodo, setNewTodo] = useState({ title: "", expiryDate: "" });

  const get_option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key":
        "$2b$10$wfM2lVb.L3VgE/AHM1nm/.NKNV8ngW.POwNlI90oW7ayKexsWIe1q"
    }
  };

  const updateAPI = (newAPI) => {
    console.log(`nowa tblica po dodaniu ${typeof newAPI}`);
    const put_option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key":
          "$2b$10$wfM2lVb.L3VgE/AHM1nm/.NKNV8ngW.POwNlI90oW7ayKexsWIe1q"
      },
      body: JSON.stringify(newAPI)
    };

    fetch("https://api.jsonbin.io/v3/b/63e8f228ace6f33a22dc51ee", put_option)
      .then(function (response) {
        // console.log(`info z fetch ${response.json()}`)
        return response.json();
      })
      // .then((data) => console.log(`to z fetcha ${data}`))
      .catch(function (err) {
        console.log("Opps, Something went wrong!", err);
      });
  };

  //------------------- inicjacja danych z API --------------

  // setTodos(	fetch('https://api.jsonbin.io/v3/b/63e8f228ace6f33a22dc51ee', get_option)
  // .then(response => response.json())
  // .then(data => setTodos(data.record))
  // .catch(function (err) {
  //   console.log('Opps, Something went wrong!', err);
  // }))

  useEffect(() => {
    fetch("https://api.jsonbin.io/v3/b/63e8f228ace6f33a22dc51ee", get_option)
      .then((response) => response.json())
      .then((data) => setTodos(data.record))
      .catch(function (err) {
        console.log("Opps, Something went wrong!", err);
      });
  }, []);

  // const [updateArrTodos, setUpdateArrTodos] = useState([]);

  useEffect(() => {
    updateAPI(todos);
  }, [todos]);

  //-------------------- dodawanie nowego todo ---------------

  const onAddTodoHandler = (newEnteredTodo) => {
    const nTodo = {
      id: new Date().getTime().toString(36),
      title: newEnteredTodo.title,
      expiryDate: newEnteredTodo.expiryDate,
      isDone: false
    };

    // setUpdateArrTodos([...todos, nTodo]);

    setTodos((prevTodos) => [...prevTodos, nTodo]);
  };

  //------------------ delete todo -------------------
  const onDeleteHandler = (todoId) => {
    // const delArr = todos.filter((todo) => todo.id !== todoId);
    // setUpdateArrTodos(todos.filter(todo => todo.id !== todoId));

    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  //---------------- change done ----------------

  const changeDoneHandler = (todoId) => {
    const updatedList = todos.map((item) => {
      if (item.id === todoId) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });

    setTodos(updatedList);
    // setUpdateArrTodos(updatedList);
  };

  return (
    <div className="App">
      <TodoForm addTodo={onAddTodoHandler} />
      <TodoList
        todos={todos}
        onChangeDone={changeDoneHandler}
        onDelete={onDeleteHandler}
      />
    </div>
  );
}

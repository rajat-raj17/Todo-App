/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  let data = JSON.parse(localStorage.getItem("user"));
  const activePerson = data?.find((x) => x.isactive);
  const [completionDate, setCompletionDate] = useState(new Date());

  useEffect(() => {
    if (activePerson?.task) setTodos(activePerson.task);
  }, [activePerson]);

  const updateLocalStorage = (updatedData) => {
    data = updatedData;
    localStorage.setItem("user", JSON.stringify(data));
  };

  const addTask = () => {
    if (newTask !== "") {
      const newTodo = {
        id: Date.now(),
        taskname: newTask,
        completed: false,
        toBeDoneBy: `${completionDate.getDate()}/${
          completionDate.getMonth() + 1
        }/${completionDate.getFullYear()}`,
      };

      setTodos([...todos, newTodo]);

      const updatedData = data.map((obj) =>
        obj.username === activePerson.username
          ? { ...obj, isactive: true, task: [...obj.task, newTodo] }
          : obj
      );

      updateLocalStorage(updatedData);
      setNewTask("");

      // Show success toast
      toast.success("Task added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      // Show error toast
      toast.error("Task cannot be empty", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const editTask = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, taskname: newText } : todo
      )
    );

    const updatedData = data.map((obj) =>
      obj.username === activePerson.username
        ? {
            ...obj,
            isactive: true,
            task: obj.task.map((task) =>
              task.id === id ? { ...task, taskname: newText } : task
            ),
          }
        : obj
    );

    updateLocalStorage(updatedData);

    // Show success toast
    toast.success("Task updated successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const deleteTask = (id) => {
    const allowDelete = window.confirm("Are you sure to delete?");
    if (!allowDelete) return;

    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    const updatedData = data.map((obj) =>
      obj.username === activePerson.username
        ? {
            ...obj,
            isactive: true,
            task: obj.task.filter((task) => task.id !== id),
          }
        : obj
    );

    updateLocalStorage(updatedData);

    // Show success toast
    toast.success("Task deleted successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <label>
        <h2 style={{ color: "gray" }}>Welcome</h2>
        <h3 style={{ color: "#4c72af" }}>{activePerson.name}</h3>
      </label>
      <div className="todo-form">
        <label style={{ marginInline: ".2rem" }}>
          Task Name
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            style={{ marginInline: ".2rem" }}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </label>

        <label style={{ marginInline: ".2rem" }}>
          Submission Date
          <input
            type="date"
            style={{ marginInline: ".2rem" }}
            onChange={(e) => {
              setCompletionDate(new Date(`${e.target.value}`));
            }}
          />
        </label>
        <button
          onClick={addTask}
          style={{ display: "block", margin: ".5rem auto" }}
        >
          Add Task
        </button>
      </div>

      <div className="filter-options">
        <label>
          <input
            type="radio"
            value="all"
            onChange={() => setFilter("all")}
            checked={filter === "all"}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="active"
            onChange={() => setFilter("active")}
            checked={filter === "active"}
          />
          Active
        </label>
        <label>
          <input
            type="radio"
            value="completed"
            onChange={() => setFilter("completed")}
            checked={filter === "completed"}
          />
          Completed
        </label>
      </div>

      <ul className="todo-list">
        {todos.length ? (
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Date</th>
                <th>Edit or Delete Task</th>
              </tr>
            </thead>
            <tbody>
              {todos
                .filter((todo) => {
                  if (filter === "all") return true;
                  if (filter === "active") return !todo.completed;
                  if (filter === "completed") return todo.completed;
                  return true;
                })
                .map((todo) => (
                  <tr
                    key={todo.id}
                    className={todo.completed ? "completed" : ""}
                  >
                    <td>{todo.text || todo.taskname}</td>
                    <td>{todo.toBeDoneBy}</td>

                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <button
                          onClick={() =>
                            editTask(todo.id, prompt("Edit task:", todo.text))
                          }
                        >
                          Edit
                        </button>
                        <button onClick={() => deleteTask(todo.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <li style={{ textAlign: "center", width: "100%", margin: "auto" }}>
            No Task You have{" "}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Todo;

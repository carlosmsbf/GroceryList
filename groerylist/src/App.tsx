import React, { FC, useState, ChangeEvent } from "react";
import "./App.css";
import Product from "./Components/Product";
import { IGrocery } from "./Interfaces";

const App: FC = () => {
  const [product, setTask] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  let [count, setCount] = useState<number>(1);
  const [groceryList, setGroceryList] = useState<IGrocery[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setQuantity(Number(event.target.value));
    }
  };
  const addTask = (): void => {
    const newTask = { productName: product, quantity: quantity, count: count };
    setGroceryList([...groceryList, newTask]);
    setQuantity(0);
    setCount((count = count + 1));
    setTask("");
    //elaborar o text com o titulo das acoes
  };

  const completeTask = (taskNameToDelete: string): void => {
    setGroceryList(
      groceryList.filter((task) => {
        if (groceryList.length === 1) {
          setCount(1);
        }

        return task.count.toString() !== taskNameToDelete;
      })
    );
  };

  return (
    <div className="App">
      <h1 className="appTitle">Grocery List</h1>
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={product}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Quantity..."
            name="deadline"
            value={quantity}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="icon"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
            />
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg>
        </button>
      </div>
      <div className="todoList">
        <div className="results">
          <div className="paper">
            {groceryList.map((product: IGrocery, key: number) => {
              return (
                <Product
                  key={key}
                  product={product}
                  completeTask={completeTask}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

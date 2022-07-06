import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzaList, setPizzaList] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    topping: "",
    size: "",
    vegetarian: false
  });

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then((r) => r.json())
      .then((data) => setPizzaList(data));
  }, []);

  function handleEditPizza(pizza) {
    const newFormData = {
      id: pizza.id,
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    };
    setFormData(newFormData);
  }

  function handleUpdatePizza(updatedPizza) {
    const updatedPizzaList = pizzaList.map((pizza) => {
      if (pizza.id === updatedPizza.id) {
        return updatedPizza;
      } else {
        return pizza;
      }
    });
    setPizzaList(updatedPizzaList);
  }

  return (
    <>
      <Header />
      <PizzaForm
        formData={formData}
        onChangeFormData={setFormData}
        onUpdatePizza={handleUpdatePizza}
      />
      <PizzaList pizzaList={pizzaList} onEditPizza={handleEditPizza} />
    </>
  );
}

export default App;

import React from "react";

function PizzaForm({ formData, onChangeFormData, onUpdatePizza }) {
  const { id, topping, size, vegetarian } = formData;

  function handleChange(e) {
    let updatedFormData;
    if (e.target.type === "radio") {
      if (e.target.value === "Vegetarian") {
        updatedFormData = {
          ...formData,
          [e.target.name]: true
        };
      } else {
        updatedFormData = {
          ...formData,
          [e.target.name]: false
        };
      }
    } else {
      updatedFormData = {
        ...formData,
        [e.target.name]: e.target.value
      };
    }
    onChangeFormData(updatedFormData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3001/pizzas/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((r) => r.json())
      .then((data) => onUpdatePizza(data));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={topping}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <select
            className="form-control"
            name="size"
            value={size}
            onChange={handleChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={vegetarian}
              onChange={handleChange}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={!vegetarian}
              onChange={handleChange}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;

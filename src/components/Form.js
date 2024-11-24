import React, { useState } from "react";


function Form(props) {

    const [name, setName] = useState("");
    

    function handleChange(event) { //捕获用户的输入
        setName(event.target.value);
      }

    function handleSubmit(event) {
        event.preventDefault();
        if (name.trim() === "") {
            alert("Task cannot be empty!");
            return;
          }
        props.addTask(name); // 传递输入值到父组件
        setName("");         // 提交后清空输入框
      }
      
      

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;

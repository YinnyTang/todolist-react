import React, { useState } from "react";

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.name); // 初始化为 props 传递的名称
  const [newPriority, setNewPriority] = useState(props.priority || "Medium"); // 默认优先级为 Medium

  // 处理名称变化
  function handleChange(e) {
    setNewName(e.target.value);
  }

  // 处理优先级变化
  function handlePriorityChange(e) {
    setNewPriority(e.target.value);
  }

  // 提交表单，保存任务名称和优先级
  function handleSubmit(e) {
    e.preventDefault();
    // 编辑任务时，传递任务的新名称和优先级
    if (newName.trim() !== "") { // 确保名称不为空
      props.editTask(props.id, newName, newPriority);
      setEditing(false);  // 退出编辑模式
    }
  }

  
  // 编辑模式的模板
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="todo-label" htmlFor={`priority-${props.id}`}>
          Priority for {props.name}
        </label>
        <select
          id={`priority-${props.id}`}
          value={newPriority}
          onChange={handlePriorityChange}  // 更新优先级
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}  // 取消编辑
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  // 非编辑模式下的模板
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
        <span className={`todo-priority priority-${props.priority}`}>
          Priority: {props.priority}
        </span>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

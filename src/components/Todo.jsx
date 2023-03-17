import React, { useState } from "react";
import { FaCalendarPlus } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { toastError, toastSuccess } from "../utils/toaster";
import Modal from "./Modal";

const Todo = ({ todo, datas, setDatas, title }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = (taskId, delTitle) => {
    const updatedData = datas.filter((task) => task.id !== taskId);
    setDatas(updatedData);
    toastSuccess(`${delTitle} o'chirildi`);
  };

  const handleToggleStatus = (taskId) => {
    setDatas((prevDatas) => {
      return prevDatas.map((task) => {
        if (task.id === taskId) {
          const done = !task.done;
          const message = done
            ? `${task.title} bajarildi`
            : `${task.title} bajarilmadi`;
          done ? toastSuccess(message) : toastError(message);
          return { ...task, done };
        }
        return task;
      });
    });
  };

  const handleEditName = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal ? (
        <Modal
          onClose={handleCloseModal}
          data={todo}
          title={title}
          setDatas={setDatas}
          datas={datas}
        />
      ) : (
        ""
      )}

      <li className="plan-list__item">
        <div className="plan-list__block">
          <h3
            className="plan-list__text"
            style={
              todo.done
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
          >
            {todo.title}
          </h3>
          <p className="plan-list__subtext flex items-center">
            {todo.date}
            <i className="icon">
              {todo.done ? <FaCalendarCheck /> : <FaCalendarPlus />}
            </i>
          </p>
        </div>
        <div className="plan-list__box">
          <button
            onClick={() => handleToggleStatus(todo.id)}
            className="plan-list__btn"
            id="add-btn"
          >
            {todo.done ? "Undone" : "Done"}
          </button>
          <button
            onClick={() => handleEditName(todo.id)}
            className="plan-list__btn"
            id="Edit-btn"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(todo.id, todo.title)}
            className="plan-list__btn"
            id="delete-btn"
          >
            Delete
          </button>
        </div>
      </li>
    </>
  );
};

export default Todo;

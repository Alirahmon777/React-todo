import { getUserTime } from "./utils/date";
import { useState } from "react";
import { toastError, toastSuccess } from "./utils/toaster";

function App() {
  const [datas, setDatas] = useState([
    { id: 1, title: "Python", date: getUserTime(Date.now()), done: false },
    { id: 2, title: "Java", date: getUserTime(Date.now()), done: false },
  ]);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "" || date === "") {
      return toastError("Iltimos, maʻlumotlarni kiriting");
    }

    if (!title) return;
    const newData = {
      id: Date.now(),
      title,
      date,
      done: false,
    };

    setDatas([...datas, newData]);
    setTitle("");

    toastSuccess(`${title} muvaffaqiyatli qoʻshildi`);
  };

  const handleDelete = (taskId, delTitle) => {
    const updatedData = datas.filter((task) => task.id !== taskId);
    setDatas(updatedData);
    toastSuccess(`${delTitle} o'chirildi`);
  };

  const handleToggleStatus = (taskId) => {
    const updatedData = datas.map((task) => {
      if (task.id === taskId) {
        if (task.done) {
          toastError(`${task.title} bajarilmadi`);
        } else {
          toastSuccess(`${task.title} bajarildi`);
        }
        return { ...task, done: !task.done };
      }

      return task;
    });
    setDatas(updatedData);
  };

  const handleEditName = (taskId, title, date) => {
    const updatedData = datas.map((task) => {
      if (task.id === taskId) {
        toastSuccess(`${task.title} ${title}ga o'zgarildi`);
        return { ...task, title, date };
      }
      return task;
    });
    setDatas(updatedData);
  };

  return (
    <>
      <section className="plan">
        <div className="container">
          <div className="plan__wrapper">
            <h1 className="plan__title">Bugungi rejangizni kiriting</h1>
            <form
              action=""
              onSubmit={handleSubmit}
              className="plan__form"
              id="form"
            >
              <input
                type="text"
                className="plan__input"
                placeholder="bugungi rejangiz"
                onChange={(e) => setTitle(e.target.value)}
              />
              <button type="submit" className="plan__btn">
                Rejani Qo'shish
              </button>
              <input
                type="datetime-local"
                className="plan__date"
                onChange={(e) => setDate(getUserTime(e.target.value))}
              />
            </form>
            <ul className="plan-list">
              {datas.map((datas) => (
                <li className="plan-list__item" key={datas.id}>
                  <div className="plan-list__block">
                    <h3
                      className="plan-list__text"
                      style={
                        datas.done
                          ? { textDecoration: "line-through" }
                          : { textDecoration: "none" }
                      }
                    >
                      {datas.title}
                    </h3>
                    <p className="plan-list__subtext">
                      {datas.date} <i className="bx bx-calendar-plus"></i>
                    </p>
                  </div>
                  <div className="plan-list__box">
                    <button
                      onClick={() => handleToggleStatus(datas.id)}
                      className="plan-list__btn"
                      id="add-btn"
                    >
                      {datas.done ? "Undone" : "Done"}
                    </button>
                    <button
                      onClick={() =>
                        handleEditName(
                          datas.id,
                          prompt("Edit task name:"),
                          prompt("Edit task date: \n exapmle 01.01.23 12:59:00")
                        )
                      }
                      className="plan-list__btn"
                      id="Edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(datas.id, datas.title)}
                      className="plan-list__btn"
                      id="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

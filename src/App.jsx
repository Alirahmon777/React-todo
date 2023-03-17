import { getUserTime } from "./utils/date";
import { useState } from "react";
import { toastError, toastSuccess } from "./utils/toaster";
import Todo from "./components/Todo";

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
      id: datas.length > 0 ? datas[datas.length - 1].id + 1 : 1,
      title,
      date,
      done: false,
    };

    setDatas([...datas, newData]);

    toastSuccess(`${title} muvaffaqiyatli qoʻshildi`);
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
                className="plan__input text-black"
                placeholder="bugungi rejangiz"
                onChange={(e) => setTitle(e.target.value)}
              />
              <button type="submit" className="plan__btn text-black">
                Rejani Qo'shish
              </button>
              <input
                type="datetime-local"
                className="plan__date text-black"
                onChange={(e) => setDate(getUserTime(e.target.value))}
              />
            </form>
            <ul className="plan-list">
              {datas.map((data, i) => (
                <Todo
                  todo={data}
                  title={title}
                  datas={datas}
                  setDatas={setDatas}
                  key={i}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;

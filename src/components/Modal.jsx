import React, { useState } from "react";
import { toastSuccess } from "../utils/toaster";
import { getUserTime } from "../utils/date";

function Modal({ onClose, data, setDatas, datas, title }) {
  const [newState, setNewState] = useState({
    id: data.id,
    title: data.title,
  });

  const handleSaveModal = (e) => {
    e.preventDefault();
    console.log(title);

    toastSuccess(`${title}➡️${data.title}ga o'zgardi`);
  };

  return (
    <div className="modal bg-[#00000050] flex justify-center items-center w-full h-full fixed left-0 top-0 z-10">
      <div className="modal-wrapper bg-slate-50 text-black rounded-lg w-2/6 h-1/2 min-h-[300px] flex flex-col">
        <div className="modal-head bg-[#FFBC40] text-white rounded-t-lg flex items-center justify-between py-3 px-4">
          <h2 className="text-[22px]">Edit Item</h2>
          <button className="bg-transparent text-[24px]" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content py-3 px-4 h-full">
          <form
            className="flex flex-col h-full justify-between"
            onSubmit={handleSaveModal}
          >
            <div className="inputs flex flex-col gap-3">
              <label className="flex items-center justify-between">
                Name:
                <input
                  type="text"
                  className="py-2 px-3 rounded-[8px] text-black outline-none shadow-md ml-2"
                  name="title"
                  value={newState.title}
                  onChange={(evt) => {
                    const result = datas.map((element) => {
                      if (element.id === data.id) {
                        element.title = evt.target.value;
                      }
                      return element;
                    });
                    setDatas(result);
                    setNewState(evt.target.value);
                  }}
                />
              </label>
              <label className="flex items-center justify-between">
                Date:
                <input
                  type="datetime-local"
                  name="date"
                  value={data.date}
                  onChange={(evt) => {
                    const result = datas.map((element) => {
                      if (element.id === data.id) {
                        element.date = evt.target.value;
                      }
                      return element;
                    });
                    setDatas(result);
                  }}
                  className="py-2 px-3 rounded-[8px] text-black outline-none shadow-md ml-2"
                  autoComplete="off"
                />
              </label>
            </div>
            <div className="btns flex gap-2">
              <button
                onClick={onClose}
                className="w-full text-center bg-[#DD2336] text-white rounded-md text-[18px] py-2"
              >
                Close
              </button>
              <button
                type="submit"
                className="w-full bg-[#FFBC40] text-white rounded-md text-[18px] py-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;

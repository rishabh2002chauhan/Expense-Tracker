import { useState, useEffect } from "react";
import { useProductStore } from "../store/product";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import Dropdown from "./Dropdown";

function EditRow({ rowValue, changeEditIndex, expense_id, options, onChange }) {
  const [element, setElement] = useState(rowValue);
  const { updateExpense } = useProductStore();

  function handleCloseEditRow() {
    changeEditIndex(-1);
  }

  async function handleSubmitEditRow() {
    const data = await updateExpense(element, expense_id);
    handleCloseEditRow();
  }

  return (
    <>
      {Object.keys(element).map((key) => {
        if (key === "_id") {
          return;
        }
        let cellTag = (
          <input
            value={element[key]}
            onChange={(e) => setElement({ ...element, [key]: e.target.value })}
            className={`block p-2 w-${
              key === "ID" ? 10 : 20
            } text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          ></input>
        );

        if (key == "Category") {
          cellTag = (
            <Dropdown
              selectStyle="block border dark:bg-gray-700 dark:border-gray-600 p-2.5 w-25 dark:text-white rounded-lg dark:focus:border-blue-500 dark:focus:ring-blue-500"
              options={options}
              onChange={(e) =>
                setElement({ ...element, [key]: e.target.value })
              }
              value={element[key]}
            />
          );
        }

        if (key === "Description") {
          cellTag = (
            <textarea
              value={element[key]}
              onChange={(e) =>
                setElement({ ...element, [key]: e.target.value })
              }
              rows="4"
              className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          );
        }

        return (
          <td className="px-5 py-4" key={key}>
            {cellTag}
          </td>
        );
      })}
      <td className="px-6 py-4">
        <button onClick={handleSubmitEditRow}>
          <IoMdAdd />
        </button>
      </td>
      <td className="px-6 py-4">
        <button onClick={handleCloseEditRow}>
          <IoMdClose />
        </button>
      </td>
    </>
  );
}

export default EditRow;

import { useState } from "react";
import EditRow from "./EditRow";
import { MdEdit, MdDelete } from "react-icons/md";

const TableRows = ({ dataForGraphs, handleDeleteRow, CategoryOptions }) => {
  const [editIndex, setEditIndex] = useState(-1);

  return dataForGraphs.map((element, index) => (
    <tr
      key={element.ID}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
    >
      {index !== editIndex && (
        <>
          {Object.keys(element).map((key) => {
            if (key !== "_id") {
              let descriptionWidth = "";
              if (key === "Description") {
                descriptionWidth = " max-w-[20rem]";
              }
              return (
                <td className={"px-6 py-4" + descriptionWidth} key={key}>
                  {element[key]}
                </td>
              );
            }
          })}
          <td className="px-6 py-4">
            <button onClick={() => setEditIndex(index)}>
              <MdEdit />
            </button>
          </td>
          <td className="px-6 py-4">
            <button onClick={() => handleDeleteRow(element._id)}>
              <MdDelete />
            </button>
          </td>
        </>
      )}
      {index === editIndex && (
        <EditRow
          rowValue={element}
          changeEditIndex={setEditIndex}
          expense_id={element._id}
          options={CategoryOptions}
        />
      )}
    </tr>
  ));
};

export default TableRows;

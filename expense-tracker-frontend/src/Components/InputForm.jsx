import { Fragment } from "react";
import Dropdown from "./Dropdown";

const InputForm = ({
  dataObject,
  setDataObject,
  CategoryOptions,
  handleAddData,
  handleReset,
}) => {
  return (
    <div className="grid md:gap-1.5 w-100 grid-flow-row">
      {Object.keys(dataObject).map((key) => {
        let respectiveInput = (
          <input
            placeholder={key}
            id={key}
            name={key}
            value={dataObject[key]}
            onChange={(e) =>
              setDataObject({ ...dataObject, [key]: e.target.value })
            }
            className={`p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          ></input>
        );

        if (key === "Category") {
          respectiveInput = (
            <Dropdown
              selectStyle="border dark:bg-gray-700 dark:border-gray-600 p-2.5 w-full dark:text-white rounded-lg dark:focus:border-blue-500 dark:focus:ring-blue-500"
              options={CategoryOptions}
              onChange={(e) =>
                setDataObject({ ...dataObject, [key]: e.target.value })
              }
              value={dataObject[key]}
              id={key}
            />
          );
        }

        if (key === "Description") {
          respectiveInput = (
            <textarea
              value={dataObject[key]}
              onChange={(e) =>
                setDataObject({ ...dataObject, [key]: e.target.value })
              }
              className="w-full p-2.5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          );
        }

        return (
          <Fragment key={key}>
            <div className="grid md:gap-1 w-full grid-flow-row">
              <label htmlFor={key}>{key}</label>
              {respectiveInput}
            </div>
          </Fragment>
        );
      })}
      <button className="w-full" onClick={handleAddData}>
        Add Expense
      </button>
      <button className="w-full" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default InputForm;

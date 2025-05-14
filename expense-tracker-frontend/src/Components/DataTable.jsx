import React from "react";
import TableRows from "./TableRows";

const DataTable = ({
  tableHeader,
  dataForGraphs,
  handleDeleteRow,
  CategoryOptions,
}) => {
  return (
    <table className=" table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {tableHeader.map((key) => (
            <th className="px-6 py-3" key={key}>
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <TableRows
          dataForGraphs={dataForGraphs}
          handleDeleteRow={handleDeleteRow}
          CategoryOptions={CategoryOptions}
        />
      </tbody>
    </table>
  );
};

export default DataTable;

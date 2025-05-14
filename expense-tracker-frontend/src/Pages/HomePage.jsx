import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LabelList,
  Label,
} from "recharts";

import { IoMdAdd, IoMdClose } from "react-icons/io";
import EditRow from "../Components/EditRow";
import getGroupByData from "../Utils/getGroupByData";
import InputForm from "../Components/InputForm";
import DataTable from "../Components/DataTable";

const categories = ["Groceries", "Stationary", "Snacks", "Furniture", "Others"];
const colors = ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"];

function CustomTooltip({ payload, label, active, chart = "line" }) {
  if (active) {
    return (
      <div className="bg-gray-800 p-2 text-white border rounded-lg border-gray-400">
        <p className="">Label: {chart == "line" ? label : payload[0].name}</p>
        <p className="">Expense: {payload[0].value}</p>
      </div>
    );
  }
}

const HomePage = () => {
  const { createExpense, fetchExpenses, expenses, deleteExpense } =
    useProductStore();
  const [expense, setExpense] = useState({
    ID: "",
    Amount: "",
    Category: "Groceries",
    Description: "",
    Date: "",
  });
  const [inputFormOpen, setInputFormOpen] = useState(false);

  const tableHeader = Object.keys(expense);
  tableHeader.push("Edit", "Delete");
  let totalExpenses = 0;

  const dataForGraphs = expenses.map((element) => {
    totalExpenses += element.Amount;

    return {
      _id: element._id,
      ID: element.ID,
      Amount: element.Amount,
      Category: element.Category,
      Description: element.Description,
      Date:
        new Date(element.Date).getFullYear() +
        "-" +
        (new Date(element.Date).getMonth() + 1) +
        "-" +
        new Date(element.Date).getDate(),
    };
  });

  dataForGraphs.sort(function (m1, m2) {
    return new Date(m1.Date) - new Date(m2.Date);
  });

  const dataForLineChart = getGroupByData("Date", dataForGraphs);
  const dataForPieChart = getGroupByData("Category", dataForGraphs);

  const handleAddExpense = async () => {
    const data = await createExpense(expense);
    console.log(data);
    handleReset();
    setInputFormOpen(false);
  };

  const handleReset = () => {
    setExpense({
      ID: "",
      Amount: "",
      Category: "",
      Description: "",
      Date: "",
    });
  };

  const handleDeleteExpense = async (id) => {
    const data = await deleteExpense(id);
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <>
      <div>HomePage</div>
      <Link to={"/"}>AuthPage</Link>
      <div className="flex flex-col justify-center items-center w-full py-5">
        <button onClick={() => setInputFormOpen(!inputFormOpen)}>
          {inputFormOpen ? <IoMdClose /> : "Add Expense"}
        </button>
        {inputFormOpen && (
          <InputForm
            dataObject={expense}
            setDataObject={setExpense}
            CategoryOptions={categories}
            handleAddData={handleAddExpense}
            handleReset={handleReset}
          />
        )}
      </div>
      {expenses.length > 0 && (
        <div className=" flex justify-center items-center">
          <DataTable
            tableHeader={tableHeader}
            dataForGraphs={dataForGraphs}
            handleDeleteRow={handleDeleteExpense}
            CategoryOptions={categories}
          />
        </div>
      )}
      {expenses.length === 0 && <div>No expenses yet...</div>}
      {expenses.length > 0 && (<div className="flex justify-center items-center py-5 ">
        <div className="flex flex-col justify-center items-center border-2 border-gray-500 rounded-lg">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-red-400 pt-2 px-2">
            &#8377; {totalExpenses}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 pb-2 px-2">
            Total Expense
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-full gap-30 py-3">
        <div>
          <LineChart
            width={800}
            height={500}
            data={dataForLineChart}
            margin={{ bottom: 20, left: 20, right: 5, top: 5 }}
          >
            <Line type="monotone" dataKey="Amount" stroke="#ffa600" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="Date">
              <Label
                value="Dates on which expenses were made"
                offset={0}
                position="bottom"
              />
            </XAxis>
            <YAxis>
              <Label
                value="Amount spent"
                offset={0}
                position="left"
                angle="-90"
                textAnchor="middle"
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </div>
        <div>
          <PieChart width={500} height={500}>
            <Pie
              data={dataForPieChart}
              dataKey="Amount"
              nameKey="Category"
              cx="50%"
              cy="50%"
              outerRadius={170}
            >
              {dataForPieChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
              <LabelList dataKey="Category" position="outside" />
            </Pie>
            <Tooltip content={<CustomTooltip chart="pie" />} />
          </PieChart>
        </div>
      </div>)}
    </>
  );
};

export default HomePage;

export default function getGroupByData(column, data) {
  const ColumnToAmount = {};

  data.forEach((element) => {
    if (!ColumnToAmount.hasOwnProperty(element[column])) {
      ColumnToAmount[element[column]] = Number(element.Amount);
    } else {
      ColumnToAmount[element[column]] += Number(element.Amount);
    }
  });

  const dataForChart = [];

  Object.entries(ColumnToAmount).forEach((entry) => {
    const [key, value] = entry;
    dataForChart.push({ [column]: key, Amount: value });
  });

  return dataForChart;
}

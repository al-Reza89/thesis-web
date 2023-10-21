import React from "react";

interface Cell {
  col_span: number;
  row_span: number;
  value: string;
  is_header: boolean;
}

interface TableProps {
  data: Cell[][];
  highlighted_cells: number[][];
}

function Table({ data, highlighted_cells }: TableProps) {
  // Separate the first header row and the rest of the data
  const firstHeaderRow = data[0];
  const secondHeaderRow = data[1];
  const tableData = data.slice(2);

  return (
    <div
      className="table-container sm:min-w-xs "
      style={{ overflowX: "scroll" }}
    >
      <table className="table">
        <thead>
          <tr>
            {firstHeaderRow.map((cell, index) => (
              <th
                key={index}
                className="th md:p-2 "
                colSpan={cell.col_span}
                rowSpan={cell.row_span}
              >
                {cell.value}
              </th>
            ))}
          </tr>
          <tr>
            {secondHeaderRow.map((cell, index) => (
              <th
                key={index}
                className="th md:p-2 "
                colSpan={cell.col_span}
                rowSpan={cell.row_span}
              >
                {cell.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr
              key={rowIndex + 2}
              className={rowIndex % 2 === 0 ? "even-row" : ""}
            >
              {row.map((cell, cellIndex) => {
                const isHighlighted = highlighted_cells.some(
                  ([tableNumber, objectNumber]) =>
                    tableNumber === rowIndex + 2 && objectNumber === cellIndex
                );

                // console.log({ isHighlighted: isHighlighted });

                const cellClassName = isHighlighted ? "highlighted-td" : "td";

                return (
                  <td
                    key={cellIndex}
                    className={`${cellClassName} md:p-2 `}
                    colSpan={cell.col_span}
                    rowSpan={cell.row_span}
                  >
                    {cell.value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

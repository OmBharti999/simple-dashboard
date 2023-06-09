import { useEffect } from "react";
import dayjs from "dayjs";

import "./index.css";
import NotFound from "../../pages/NotFound";

function Table({ data, filter, setFilterData }) {
  const tableHeader = Object.keys(data[0]).filter((key) => key !== "id");

  const filterDataForName = data.filter((obj) => {
    const searchedString = filter.airlinesName.toLowerCase();
    if (!searchedString) {
      return obj;
    }
    return obj.airline.toLowerCase().includes(searchedString);
  });

  const filterData = filterDataForName.filter((obj) => {
    if (filter.priceFilter === "all") {
      return obj;
    }
    return filter.priceFilter >= obj.price;
  });

  const filterDataAfterDate = filterData.filter((obj) => {
    if (!filter.dateFilter) {
      return obj;
    }
    const startDate = dayjs(filter.dateFilter);
    const endDate = dayjs(obj.dateOfTravel);
    return endDate.diff(startDate) > 0;
  });

  useEffect(() => {
    setFilterData(filterDataAfterDate);
  }, [filter]);

  return (
    <>
      {" "}
      <table className="table">
        <thead>
          <tr>
            {tableHeader.map((field, index) => (
              <th key={index}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterDataAfterDate.map((obj, index) => (
            <tr key={obj.id}>
              {tableHeader.map((field, index) => (
                <td key={obj.id + String(index)}>
                  {field === "logo" ? (
                    <img
                      src={obj[field]}
                      alt="airline Logo"
                      width="100px"
                      height="30px"
                    />
                  ) : (
                    obj[field]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {filterDataAfterDate.length === 0 && <NotFound />}
    </>
  );
}

export default Table;

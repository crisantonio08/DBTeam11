import React, { useEffect } from "react";
import { getAllBonds } from "../services/BondServices";
import { useState } from "react";

const AllBonds = () => {
  const [bonds, setBonds] = useState([]);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    var c = !checked;
    setChecked(c);
    getBondsFromAPI(c);
  };

  useEffect(() => {
    getBondsFromAPI();
  }, []);

  const getBondsFromAPI = (c) => {
    getAllBonds(c)
      .then((res) => {
        setBonds(res.data);
        console.log(res);
      })
      .catch((err) => {
        setBonds([]);
        console.log(err);
      });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  };

  return (
    <>
      <div>
        <label>
          <input type="checkbox" checked={checked} onChange={handleChange} />
          Show only my books 
        </label>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ISIN</th>
            <th scope="col">CUSIP</th>
            <th scope="col">Type</th>
            <th scope="col">Issuer</th>
            <th scope="col">Maturity</th>
            <th scope="col">Face Value</th>
            <th scope="col">Currency</th>
            <th scope="col">Coupon %</th>
            <th scope="col">Client Name</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {bonds.map((row, index) => (
            <tr key={index}>
              <td>{row.isin}</td>
              <td>{row.cusip}</td>
              <td>{row.type}</td>
              <td>{row.issuerName}</td>
              <td>{formatDate(row.bondMaturityDate)}</td>
              <td>{row.faceValue}</td>
              <td>{row.bondCurrency}</td>
              <td>{row.couponPercent}</td>
              <td>{row.bondHolder}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AllBonds;

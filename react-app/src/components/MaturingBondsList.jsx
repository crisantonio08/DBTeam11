import React, { useState, useEffect } from "react";
import { getBondsByDate } from "../services/BondServices";

const MaturingBondsList = (props) => {
  const [bonds, setDateBonds] = useState([]);

  // useEffect(() => {
  //   if(props.props.info.check){
  //     getBondsByDateFromAPI();
  //   }else{
  //     getBondsByDateFromAPI();
  //   }
  // }, [props.props.info.check]);

  useEffect(() => {
    getBondsByDate(props.props)
      .then((res) => {
        setDateBonds(res.data);
      })
      .catch((err) => {
        setDateBonds([]);
        console.log(err);
      });
}, [props.props]);




  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  };


  const isBondNotChanged = Object.keys(bonds).length >0;
  return (
    <div>
      {isBondNotChanged? (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">ISIN</th>
          <th scope="col">Type</th>
          <th scope="col">Issuer</th>
          <th scope="col">Maturity</th>
          <th scope="col">Face Value</th>
          <th scope="col">Currency</th>
          <th scope="col">Coupon %</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {bonds.map((row, index) => (
          <tr key={index}>
            <td>{row.isin}</td>
            <td>{row.type}</td>
            <td>{row.issuerName}</td>
            <td>{formatDate(row.bondMaturityDate)}</td>
            <td>{row.faceValue}</td>
            <td>{row.bondCurrency}</td>
            <td>{row.couponPercent}</td>
            <td>{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    ):(<p>There is no bond to show for this date</p>)}
    </div>
  );
};

export default MaturingBondsList;

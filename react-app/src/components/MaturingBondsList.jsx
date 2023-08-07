import { getBondsByDate } from "../services/BondServices";
import { useState } from "react";
import { useEffect } from "react";
import BondDueNotification from "./BondDueNotification";

const MaturingBondsList = (props) => {
  const date = new Date(props.props.info);
  const [bonds, setDateBonds] = useState([]);

  // useEffect(() => {
  //   if(props.props.info.check){
  //     getBondsByDateFromAPI();
  //   }else{
  //     getBondsByDateFromAPI();
  //   }
  // }, [props.props.info.check]);

  useEffect(() => {
    getBondsByDateFromAPI();
}, [props.props.info.check, props.props.info.date]);

  const getBondsByDateFromAPI = () => {
    getBondsByDate(props.props)
      .then((res) => {
        setDateBonds(res.data);
      })
      .catch((err) => {
        setDateBonds([]);
        console.log(err);
      });
  };



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

    {/* Render BondDueNotification for each bond */}
    {bonds.map((bond) => (
        <BondDueNotification selected_date={date} bond={bond} />
      ))}

    </div>
  );
};

export default MaturingBondsList;

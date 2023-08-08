import React, { useState, useEffect } from "react";
import { getBondsByDate } from "../services/BondServices";
import SingleBondView from "./SingleBondView";

const MaturingBondsList = (props) => {
  const [bonds, setDateBonds] = useState([]);

  const handleExpand = (e) => {
    e.preventDefault();
    var b = bonds;
    b[e.target.id].expanded = !b[e.target.id].expanded;
    console.log(b)
    setDateBonds([...b]);
  }

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


  const isBondNotChanged = Object.keys(bonds).length > 0;
  return (
    <div>
      {isBondNotChanged ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"> </th>
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
              <React.Fragment key={index + 'p'}>
                <tr key={index}>
                  <td>
                    <button
                      id={index}
                      onClick={handleExpand}
                      className="btn btn-outline-primary"
                      style={{ width: '50px' }}
                    >
                      {row.expanded ? '-' : '+'}
                    </button>
                  </td>
                  <td>{row.isin}</td>
                  <td>{row.type}</td>
                  <td>{row.issuerName}</td>
                  <td>{formatDate(row.bondMaturityDate)}</td>
                  <td>{row.faceValue}</td>
                  <td>{row.bondCurrency}</td>
                  <td>{row.couponPercent}</td>
                  <td>{row.status}</td>
                </tr>
                {row.expanded ? <tr key={index + 'e'}>
                  <td colSpan={11}><SingleBondView bond={row} /></td>
                </tr> : null}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (<p>There are no bonds to display for this date.</p>)}
    </div>
  );
};

export default MaturingBondsList;

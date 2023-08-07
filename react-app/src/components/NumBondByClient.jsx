import React, { useState, useEffect } from "react";
import "../App.css";
import { getBondsByUser } from "../services/BondServices";

const NumBondByClient = (props) => {
    const [bondCount, setBondCount] = useState([]);

    useEffect(() => {
        getBondsByUser(props.props)
          .then((res) => {
            setBondCount(res.data);
          })
          .catch((err) => {
            setBondCount([]);
            console.log(err);
          });
    }, [props.props]);


    // const BondCount = [
    //     { name:"Barclays",count: 3 },
    //     { name:"British Telecom",count: 1 },
    //     { name:"Goldman Sachs",count: 2 },
    // ];

    return (
        <>
            {/* <table>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Bond Count</th>
                    </tr>
                </thead>
                <tbody>
                    {bondCount.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <div>
            <p>Data Type: {typeof bondCount}</p>
            </div>
        </>
    )
}

export default NumBondByClient
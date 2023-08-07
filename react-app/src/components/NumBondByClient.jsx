import React, { useEffect } from "react";
import "../App.css";
import { getAllBonds } from "../services/BondServices";
import { useState } from "react";

const NumBondByClient = () => {
    const [bonds, setBonds] = useState([]);

    useEffect(() => {
        getBondsFromAPI();
    }, []);

    const getBondsFromAPI = async () => {
        try {
            const response = await fetch('https://api.example.com/your-endpoint');
            const jsonData = await response.json();
            setData(jsonData); // Update the state with the retrieved data
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };


    // const BondCount = [
    //     { name:"Barclays",count: 3 },
    //     { name:"British Telecom",count: 1 },
    //     { name:"Goldman Sachs",count: 2 },
    // ];

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Bond Count</th>
                    </tr>
                </thead>
                <tbody>
                    {BondCount.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <p>Data Type: {typeof bonds}</p> */}
        </>
    )
}

export default NumBondByClient
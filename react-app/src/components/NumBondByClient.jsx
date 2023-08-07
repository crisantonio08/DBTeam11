import React, { useEffect } from "react";
import { getAllBonds } from "../services/BondServices";
import { useState } from "react";

const NumBondByClient = () => {
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
                var b = res.data;
                b.map(o => o.expanded = false)
                setBonds(b);
                console.log(res);
            })
            .catch((err) => {
                setBonds([]);
                console.log(err);
            });
    };

    const message = 'The object data is:';

    return (
        <>
            <div>NumBondByClient</div>
            <p>{message}</p>
            <pre>{JSON.stringify(bonds, null, 2)}</pre>
            {/* <p>Data Type: {typeof bonds}</p> */}
        </>
    )
}

export default NumBondByClient
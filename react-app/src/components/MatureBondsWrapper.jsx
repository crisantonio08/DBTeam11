import React from 'react'
import AllMaturingBonds from './AllMaturingBonds'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const MatureBondsWrapper = () => {
    const [checked, setChecked] = useState(false);
    const [date, setDate] = useState(new Date("2021-08-05"));


    const handleChange = () => {
      var c = !checked; 
      setChecked(c);
    };

  return (
    <>
    <div>
        <label>
          <input type="checkbox" checked={checked} onChange={handleChange} />
          Show only my books 
        </label>
        <label>
          <DatePicker selected={date} onChange={(ndate) => setDate(ndate)} />
        </label>
    </div>

    <div>
      <AllMaturingBonds
      info={checked} key={"key"} date={date}/>
    </div>
    </>
  )
}

export default MatureBondsWrapper
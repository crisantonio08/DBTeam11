import React, { useState }  from 'react';
import DatePicker from "react-datepicker";
import AllMaturingBonds from './AllMaturingBonds'


const MatureBondsWrapper = () => {
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(new Date("2021-08-05"));


  const handleChange = () => {
    var c = !checked;
    setChecked(c);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6 mb-2">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={checked}
              onChange={handleChange}
              id="showOnlyMyBooks"
            />
            <label className="form-check-label" htmlFor="showOnlyMyBooks">
              Show only my books
            </label>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <div className="form-group">
            <label htmlFor="datepicker">Select a Date:</label>
            <div className="input-group">
              <DatePicker
                selected={date}
                onChange={(ndate) => setDate(ndate)}
                id="datepicker"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <AllMaturingBonds
          info={checked} key={"key"} date={date} />
      </div>
    </>
  )
}

export default MatureBondsWrapper
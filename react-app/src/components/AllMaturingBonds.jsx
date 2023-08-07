import React from "react";
import MaturingBond from "./MaturingBond";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";

const AllMaturingBonds = (props) => {
  //Hardcoded date, later user can select
  const date = props.date;
  const [dates, setDates] = useState([])

  useEffect(() => {
    const d = updateDates()
    setDates(d)
  }, [props.date])

  const updateDates = () => {
    var a = [{ date: props.date, color: 'red', key:0 }]
    var colors = ['red', 'yellow', 'yellow', 'green', 'green']
    var c = 0;
    var i = -1;
    while (c < 5) {
      var d = moment(date, "YYYY-MM-DD").add(i, "d").toDate();
      if (d.getDay() != 0 && d.getDay() != 6) {
        a.unshift({ date: d, color: 'maroon', key:(c+1)*-1 });
        c++;
      }
      i--;
    }
    c = 0;
    i = 1;
    while (c < 5) {
      var d = moment(date, "YYYY-MM-DD").add(i, "d").toDate();
      if (d.getDay() != 0 && d.getDay() != 6) {
        a.push({ date: d, color:colors.shift(), key:(c+1)});
        c++;
      }
      i++;
    }
    return a;
  }


  return dates.map((d) => (

    <MaturingBond
      info={{ date: d.date, color:d.color, check: props.info }}
      key={d.key}
    />
  ));
};

export default AllMaturingBonds;

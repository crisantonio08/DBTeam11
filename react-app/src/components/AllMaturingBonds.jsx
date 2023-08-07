import React, { useEffect, useState } from "react";
import moment from "moment";
import MaturingBond from "./MaturingBond";

const AllMaturingBonds = (props) => {
  const date = props.date;
  const [dates, setDates] = useState([])

  useEffect(() => {
    var a = [{ date: date, color: '#d9534f', key:0 }]
    var colors = ['#d9534f', '#f0ad4e', '#f0ad4e', '#5cb85c', '#5cb85c']
    var c = 0;
    var i = -1;
    while (c < 5) {
      var d = moment(date, "YYYY-MM-DD").add(i, "d").toDate();
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        a.unshift({ date: d, color: '#a94442', key:(c+1)*-1 });
        c++;
      }
      i--;
    }
    c = 0;
    i = 1;
    while (c < 5) {
      d = moment(date, "YYYY-MM-DD").add(i, "d").toDate();
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        a.push({ date: d, color:colors.shift(), key:(c+1)});
        c++;
      }
      i++;
    }
    setDates(a)
  }, [date])


  return dates.map((d) => (

    <MaturingBond
      info={{ date: d.date, color:d.color, check: props.info }}
      key={d.key}
    />
  ));
};

export default AllMaturingBonds;

import React from 'react'
import MaturingBondsList, {formatDate} from './MaturingBondsList';
import moment from 'moment';

const MaturingBond = (props) => {
  const date = new Date(props.info.date);

  const dateStyle = {
    backgroundColor: props.info.color,
  };

  return (
    <div className="container">
      <header style={dateStyle}>
        <h3 className="my-3">{moment(date).format('MMM DD, YYYY')}</h3>
      </header>
      <MaturingBondsList props={props} />
    </div>
  )
}

export default MaturingBond
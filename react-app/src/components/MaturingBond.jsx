import React from 'react'
import moment from 'moment';
import MaturingBondsList from './MaturingBondsList';

const MaturingBond = (props) => {
  const date = new Date(props.info.date);


  return (
    <div className="container">
      <header className={'my-3 p-2 text-white'} style={{backgroundColor: props.info.color}}>
        <h3 className="mb-0">{moment(date).format('MMM DD, YYYY')}</h3>
      </header>
      <MaturingBondsList props={props} />
    </div>
  )
}

export default MaturingBond
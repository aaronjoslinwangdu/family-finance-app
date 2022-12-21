import React from 'react';

import classes from './LayoutCard.module.css';
import { useSelector } from 'react-redux';

const LayoutCard = (props) => {

  const currentLayout = useSelector(state => state.layout.currentLayout);

  let cardClasses;
  switch(currentLayout) {
    default:
    case 'day': 
      cardClasses = `${classes.card} ${classes.day}`;
      break;
    case 'week': 
      cardClasses = `${classes.card} ${classes.week}`;
      break;
    case 'month': 
      cardClasses = `${classes.card} ${classes.month}`;
      break;
  }

  return (
    <div className={cardClasses}>{props.children}</div>
  );
}

export default LayoutCard;
import React from 'react';
import { Link } from 'react-router-dom';

const DropdownItem = props => {
  return (
    <Link onClick={props.toggleNav} className='menu-item' to={props.navbarLink}>
      {props.linkName}
    </Link>
  );
};

export default DropdownItem;

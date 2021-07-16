import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';

const NavItem = props => {
  const [open, setOpen] = useState(false);
  const toggleNav = () => setOpen(!open);
  return (
    <li className='nav-item'>
      <Link
        onMouseEnter={toggleNav}
        onClick={toggleNav}
        to={`/${props.linkRoute}`}
      >
        {props.name}
      </Link>
      {open && props.elements && (
        <DropdownMenu
          open={open}
          toggleNav={toggleNav}
          elements={props.elements}
          linkRoute={props.linkRoute}
        />
      )}
    </li>
  );
};

export default NavItem;

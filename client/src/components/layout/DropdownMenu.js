import React from 'react';
import DropdownItem from './DropdownItem';

const DropdownMenu = props => {
  return (
    <div className='dropdown' onMouseLeave={props.toggleNav}>
      {props.elements.map((element, index) => (
        <DropdownItem
          navbarLink={`/${props.linkRoute}/${element.toLowerCase()}`}
          linkName={`${element}`}
          toggleNav={props.toggleNav}
        />
      ))}
    </div>
  );
};

export default DropdownMenu;

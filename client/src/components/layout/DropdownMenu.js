import React from 'react';
import DropdownItem from './DropdownItem';

const DropdownMenu = props => {
  return (
    <div className='dropdown' onMouseLeave={props.toggleNav}>
      {props.elements.map((element, index) => (
        <DropdownItem
          navbarLink={`/${props.linkRoute}/${
            element.indexOf(' ') === -1
              ? element.toLowerCase()
              : element.toLowerCase().replaceAll(' ', '')
          }`}
          linkName={`${element}`}
          toggleNav={props.toggleNav}
          key={index}
        />
      ))}
    </div>
  );
};

export default DropdownMenu;

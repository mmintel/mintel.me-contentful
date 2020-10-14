import React from 'react';
import styles from './header.module.css';
import HeaderBrand from './Header.Brand';

interface HeaderComposition {
  Brand: React.FC;
}

const Header: React.FC & HeaderComposition = ({ children }) => {
  return (
    <div className={styles.header}>
      <div className="container mx-auto">
        <div className="py-4 flex justify-between items-center">{children}</div>
      </div>
    </div>
  );
};

Header.Brand = HeaderBrand;

export default Header;

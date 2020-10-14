import React from 'react';
import styles from './header.module.css';

const Header: React.FC = ({ children }) => {
  return (
    <div className={styles.header}>
      <div className="container mx-auto">
        <div className="py-4 flex justify-between items-center">{children}</div>
      </div>
    </div>
  );
};

export default Header;

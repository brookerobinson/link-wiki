import React from 'react';

import classes from './TableCell.module.css';

const tableCell = (props) => {
    return (
        <td className={classes[props.cellClass]}>
            {props.children}
        </td>
    );
};

export default tableCell;
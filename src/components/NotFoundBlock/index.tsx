import styles from './NotFoundBlock.module.scss';
import React from "react";

export const NotFoundBlock: React.FC = () => {
    return (
            <h1 className={styles.root}>
                <span>😐</span>
                <br/>
                Not Found
            </h1>
    );
};
import React from 'react';
import styles from './cardcomponent.module.css';

function CardComponent({question}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardcontent}>
        <p className={styles.cardtitle}>{question}</p>
        <p className={styles.cardpara}>
          Take time
        </p>
      </div>
    </div>
  );
}

export default CardComponent;

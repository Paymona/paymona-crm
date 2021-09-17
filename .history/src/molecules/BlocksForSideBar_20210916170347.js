import React from 'react'
import styles from '../scss/molecules/BlocksForSideBar.module.scss'
const BlocksForSideBar = ({
  text,
  content,
}) => {
  return (
    <div className={styles.root}>
      {content}
      <span className={styles.text}>
        {text}
      </span>
    </div>
  )
}

export default BlocksForSideBar
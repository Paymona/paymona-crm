import classNames from 'classnames'
import React, { useState } from 'react'
import styles from '../scss/atom/Icons.module.scss'

const Icons = ({
 icon,
 clasName,
 active,
 rotate
}) => {


  return (
    <div className={styles.root}>
      <button
       className={
         classNames(clasName, rotate ? styles.rotate : clasName
          active ? styles.dis : null)}>
        {icon}
      </button>
    </div>
  )
}

export default Icons
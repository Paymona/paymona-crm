import React from 'react'
import { TopPanelInPopup } from '../molecules'
import DropdownInput from '../molecules/DropDownInput'
import { Wrap } from '../organisms'
import styles from '../scss/popups/PopupFitBack.module.scss'
const PopupFitback = ({

}) => {
  return (
    <div className={styles.root}>
       <TopPanelInPopup
          title='Отзыв'       
       />

      
      
      
      <Wrap
        className={styles.status}
      >
        <span>Статус</span>
        <DropdownInput
          width={240}
        />
      </Wrap>

    </div>
  )
}

export default PopupFitback

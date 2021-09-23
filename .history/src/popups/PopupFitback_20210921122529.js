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

      <div className={styles.main}>

        <Wrap
          flex
          spaceBetween
          alignCenter
        >
          <Wrap
            flex
            column
          >
            <span className={styles.}>Отправитель:</span>
            <span>Tcell</span>
          </Wrap>
          <Wrap
            flex
            column
          >
            <span className={styles.subTitle}>Продукт:</span>
            <span>Аналитика</span>
          </Wrap>
          <Wrap
            flex
            column
          >
            <span className={styles.subTitle}>Дата отправки:</span>
            <span>12/05/2021</span>
          </Wrap>
        </Wrap>

      </div>

    </div>
  )
}

export default PopupFitback

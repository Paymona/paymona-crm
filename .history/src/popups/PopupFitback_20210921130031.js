import React from 'react'
import { DropDownInput, TopPanelInPopup } from '../molecules'
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
            autoWidth={false}
            gap={6}
          >
            <span className={styles.subTitle}>Отправитель:</span>
            <span className={styles.title}>Tcell</span>
          </Wrap>
          <Wrap
            flex
            column
            autoWidth={false}
            gap={6}
          >
            <span className={styles.subTitle}>Продукт:</span>
            <span className={styles.title}>Аналитика</span>
          </Wrap>
          <Wrap
            flex
            column
            autoWidth={false}
            gap={6}
          >
            <span className={styles.subTitle}>Дата отправки:</span>
            <span className={styles.title}>12/05/2021</span>
          </Wrap>
        </Wrap>

        <Wrap
          flex
          column
        >
          <span className={styles.}>Статус</span>
          <DropDownInput
            width={240}
          />
        </Wrap>

      </div>

    </div>
  )
}

export default PopupFitback

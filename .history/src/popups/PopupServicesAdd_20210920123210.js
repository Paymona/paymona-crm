import classNames from 'classnames'
import React from 'react'
import { AnimatedInput } from '../molecules'
import TopPanelInPopup from '../molecules/TopPanelInPopup'
import { Wrap } from '../organisms'
import styles from '../scss/popups/PopupServices.module.scss'
const PopupServicesAdd = ({
  className,

}) => {
  return (
    <div className={classNames(className, styles.root)}>
      <TopPanelInPopup/>
        <Wrap
          flex
          
        >
          <AnimatedInput/>
        </Wrap>
    </div>
  )
}

export default PopupServicesAdd

import React, { useContext } from 'react'
import styles from './Card.module.css'
import { BsPentagonFill as BsPentagon } from 'react-icons/bs'
import { FaArrowRight } from 'react-icons/fa'
import { AppContext } from '../../context/AppProvider'

function Card({ item, setCurrentUser, setShowCards }) {
  const { albums } = useContext(AppContext)
  const clickHandler = () => {
    setShowCards(false)
    setCurrentUser(item)
  }
  const currentTotal = albums[item]?.notSeen?.length
  const currentTitle = albums[item]?.title
  return (
    <div className={styles.card} onClick={clickHandler}>
      <div className={styles.cardTop}>
        <div className={styles.iconContainer}>
          <BsPentagon className={styles.icon} />
          <div className={styles.arrowContainer}>
            <FaArrowRight />
          </div>
        </div>
      </div>
      <div>
        <p className={styles.cardTitle}>{currentTitle}</p>
      </div>
      <p className={styles.totalItems}>{currentTotal}</p>
    </div>
  )
}

export default Card

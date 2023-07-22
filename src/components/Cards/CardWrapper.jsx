import React, { useContext, useState } from 'react'
import styles from './CardWrapper.module.css'
import { AppContext } from '../../context/AppProvider'
import Card from './Card'
import Items from './Items'

function CardWrapper() {
  const [currentUser, setCurrentUser] = useState(-1)
  const { albums, showCards, setShowCards, searchInput } = useContext(
    AppContext,
  )

  //search through cards title
  let cardItems = { ...albums }
  let cardsVisible = false
  if (searchInput.trim().length > 0) {
    let filteredItems = Object.keys(albums).filter((album) => {
      const albumTitle = albums[album].title.toLowerCase()
      const searchValue = searchInput.toLowerCase()
      if (albumTitle.startsWith(searchValue)) {
        return true
      } else {
        return false
      }
    })
    if (filteredItems.length > 0) {
      let itemsToShow = {}
      filteredItems.forEach((fi) => {
        itemsToShow[fi] = albums[fi]
      })
      cardItems = itemsToShow
      cardsVisible = true
    }
  } else {
    cardsVisible = showCards
  }

  //search through items
  let userItem = currentUser
  if (searchInput.trim().length > 0 && !cardsVisible) {
    let resultUser = Object.keys(albums).findIndex((album) => {
      const { seen, notSeen } = albums[album]

      //check in not seen
      let foundInNotSeen = -1;
      foundInNotSeen = notSeen.findIndex((ele) => {
        const itemTitle = ele.title?.toLowerCase()
        if (itemTitle.startsWith(searchInput)) {
          return true
        }
        return false
      })

      //check in seen
      let foundInSeen = -1
      if (foundInNotSeen !== -1) {
        seen.findIndex((ele) => {
          const itemTitle = ele.title?.toLowerCase()
          if (itemTitle.startsWith(searchInput)) {
            return true
          }
          return false
        })
      }

      return foundInNotSeen !== -1 || foundInSeen !== -1;
    })

    if (resultUser !== -1) {
      userItem = Object.keys(albums)[resultUser];
      cardsVisible = false
    }
  }

  return (
    <div className={styles.cardContainer}>
      {cardsVisible ? (
        <div className={styles.cardBox}>
          {Object.keys(cardItems).map((album) => (
            <Card
              setCurrentUser={setCurrentUser}
              setShowCards={setShowCards}
              item={album}
              key={album}
            />
          ))}
        </div>
      ) : (
        <Items currentUser={userItem} />
      )}
    </div>
  )
}

export default CardWrapper

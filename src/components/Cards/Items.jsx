import React, { useContext } from 'react'
import { AppContext } from '../../context/AppProvider'
import styles from './Items.module.css'

function Items({ currentUser }) {
  const { albums, setAlbums } = useContext(AppContext)
  const currentItem = albums[currentUser]
  const notSeen = currentItem?.notSeen.map((el) => {
    return { ...el }
  })
  const seen = currentItem?.seen.map((el) => {
    return { ...el }
  })
  const items = [...notSeen, ...seen]
  return (
    <div className={styles.itemContainer}>
      <h2>{currentItem?.title}</h2>
      <div className={styles.itemList}>
        {notSeen.map((item) => (
          <p key={item.id} onClick={() => {
            const itemIndex = notSeen.findIndex(el => el.Id === item.Id);
            const deletdItem = notSeen.splice(itemIndex, 1)[0];
            seen.push(deletdItem);
            setAlbums({...albums, [currentUser]: {...albums[currentUser], notSeen, seen}});
          }} className={styles.item}>
            {item.title}
          </p>
        ))}
        {
          seen.map((item) => (
            <p key={item.id} onClick={() => {
              const itemIndex = seen.findIndex(el => el.Id === item.Id);
              const deletdItem = seen.splice(itemIndex, 1)[0];
              notSeen.push(deletdItem);
              setAlbums({...albums, [currentUser]: {...albums[currentUser], notSeen, seen}});
            }} className={styles.itemSeen}>
              {item.title}
            </p>
          ))
        }
      </div>
    </div>
  )
}

export default Items

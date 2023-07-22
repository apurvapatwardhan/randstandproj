import React, { useContext } from 'react'
import styles from './HomeWrapper.module.css'
import { AppContext } from '../../context/AppProvider'

function HomeWrapper({children}) {
  const {showCards, setShowCards, searchInput, setSearchInput} = useContext(AppContext);

  //handlers
  const showCardHandler = (show) => {
    setSearchInput("")
    setShowCards(show)
  }

  const searchHandler = (e) => {
    const inputVal = e.target.value;
    setSearchInput(inputVal.toLowerCase());
  }


  return (
    <div className={styles.container}>
      <header>
        <div className={styles.headerRight}>
          <img
            src="https://th.bing.com/th/id/OIP.lIcnQodaqS00THBBUUbO2gAAAA?pid=ImgDet&w=199&h=99&c=7&dpr=1.3"
            alt="logo"
            className={styles.logo}
            onClick={() => showCardHandler(true)}
          />
        </div>
        {showCards ? (
          <div>
            <input className={styles.searchInput} type="text" name="search" id="search" placeholder="Search" onChange={searchHandler} value={searchInput}/>
          </div>
        ) : null}
      </header>
      {
        children
      }

      {/* <footer>
        <div>
          <img
            src="https://th.bing.com/th/id/OIP.lIcnQodaqS00THBBUUbO2gAAAA?pid=ImgDet&w=199&h=99&c=7&dpr=1.3"
            alt="logo"
            className={styles.logo}
          />
        </div>
      </footer> */}
    </div>
  )
}

export default HomeWrapper

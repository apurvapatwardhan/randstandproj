import React, { createContext, useEffect, useState } from "react";
import { ALBUM_URL } from "../constants";

//Create Context
export const AppContext = createContext();

async function fetchData(setter1, setter2) {
  const resp = await fetch(ALBUM_URL);
  const op = await resp.json();
  const data = {};
  op.forEach((album) => {
    const { userId } = album;
    if (data[`${userId}`]) {
      data[`${userId}`].notSeen.push(album);
    } else {
      data[`${userId}`] = {
        notSeen: [],
        seen: [],
        title: `Random-${userId}-User`,
      };
    }
  });
  console.log(data, "data");
  setter2(data);
  setter1(data);
}

//App provider
function AppProvider({ children }) {
  //commplete albums data
  const [albums, setAlbums] = useState({});
  const [totalData, setTotalData] = useState({});
  const [showCards, setShowCards] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  
  console.log("albums", albums); //debuging

  //fetch data
  useEffect(() => {
    fetchData(setAlbums, setTotalData);
  }, []);

  const value = {
    albums,
    setAlbums,
    showCards,
    setShowCards,
    totalData,
    setTotalData,
    searchInput,
    setSearchInput,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;

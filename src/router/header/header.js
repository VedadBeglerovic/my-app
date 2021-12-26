import "./header.css";
import HeaderItem from "./headerItem";
import React, { useState, useContext } from "react";
import {UserContext} from '../../App'
export default function Header() {

  const loggedInUser = useContext(UserContext);

  const [selectedItem, setSelectedItem] = useState("");

  const handleSelectHeaderItem = (value) => {
    setSelectedItem(value);
  };

  return (
    <>
<div className="headerContainer">
      <HeaderItem
        text={"Home"}
        route={"/"}
        onClick={handleSelectHeaderItem}
        isSelectedItem={selectedItem === "Home"}
      />
      {loggedInUser==='admin' && <HeaderItem
        text={"Users"}
        route={"/users"}
        onClick={handleSelectHeaderItem}
        isSelectedItem={selectedItem === "Users"}
      />}
      <HeaderItem
        text={"About"}
        route={"/about"}
        onClick={handleSelectHeaderItem}
        isSelectedItem={selectedItem === "About"}
      />
      <HeaderItem
        text={"Location"}
        route={"/locations"}
        onClick={handleSelectHeaderItem}
        isSelectedItem={selectedItem === "Location"}
      />
      <HeaderItem
        text={"Contact"}
        route={"/contact"}
        onClick={handleSelectHeaderItem}
        isSelectedItem={selectedItem === "Contact"}
      />
    </div>
    </>
  );
}

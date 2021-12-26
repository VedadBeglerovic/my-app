import "./headerItem.css";
import { Link } from "react-router-dom";

export default function HeaderItem({ route, text, onClick, isSelectedItem }) {
  
    const handleClick = () => {
    onClick(text);
  };

  return (
    <div
      className={isSelectedItem ? "selectedHeaderItem" : "headerItem"}
      onClick={handleClick}
    >
      <span className="headerItemColor"></span>
      <Link to={route}>{text}</Link>
    </div>
  );
}

import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.header}>
      <div>
        <NavLink to={"/home"}>Home</NavLink>
      </div>
      <div>
        <NavLink to={"/about"}>About</NavLink>
      </div>
    </div>
  );
};

export default Navbar;

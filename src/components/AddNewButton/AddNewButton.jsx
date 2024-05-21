import React from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./AddNewButton.module.css";

const AddNewButton = ({ list, onClick }) => {
  const buttonText = list ? "Add another list" : "Add another card";
  const buttonClass = list ? styles.list : styles.card;

  return (
    <div className={`${styles.addNewButton} ${buttonClass}`} onClick={onClick}>
      <IconButton>
        <AddIcon />
      </IconButton>
      <span style={{ flexShrink: 0 }}> {buttonText}</span>
    </div>
  );
};

export default AddNewButton;

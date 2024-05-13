import React, { useState } from "react";
// import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect, useDispatch } from "react-redux";
import { editListTitle } from "../../features/list/listSlice";
import { deleteList as deleteListFromListSlice } from "../../features/list/listSlice";
import { deleteList as deleteListFromBoardSlice } from "../../features/board/boardSlice";
// import { editListTitle, deleteList, deleteCard } from "../actions";
import styles from "./List.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const List = ({ key, listID, title, cards, index }) => {
  const [editMode, setEditMode] = useState(false);
  const [listTitle, setListTitle] = useState(title);

  const dispatch = useDispatch();
  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 20) setListTitle(e.target.value);
  };

  const handleCloseEdit = (e) => {
    setEditMode(false);
    dispatch(editListTitle(listID, listTitle));
  };

  const handleDeleteList = () => {
    //console.log("KKList: delete list: ", listID);
    dispatch(deleteListFromListSlice(listID));
    dispatch(deleteListFromBoardSlice(listID));
  };

  const renderEditInput = () => {
    return (
      <input
        className={styles.styledInput}
        type="text"
        value={listTitle}
        onChange={handleChange}
        autoFocus
        onFocus={handleFocus}
        onBlur={handleCloseEdit}
      />
    );
  };

  return (
    <div>
      <div className={styles.listContainer}>
        <div>
          <div>
            {editMode ? (
              renderEditInput()
            ) : (
              <div
                className={styles.titleContainer}
                onClick={() => setEditMode(true)}
              >
                <div className={styles.listTitle}>{listTitle}</div>
                <IconButton aria-label="delete">
                  <DeleteIcon onClick={handleDeleteList}>delete</DeleteIcon>
                </IconButton>
              </div>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default List;

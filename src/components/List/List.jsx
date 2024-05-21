import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  editListTitle,
  deleteList as deleteListFromListSlice,
} from "../../features/list/listSlice";
import { deleteList as deleteListFromBoardSlice } from "../../features/board/boardSlice";
import styles from "./List.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import CardComponent from "../Card/CardComponent";
import CreateComponent from "../CreateComponent/CreateComponent";

const List = React.memo(({ listID, title, cards, index }) => {
  const currentBoard = useSelector((state) => state.currentBoard);
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
    dispatch(editListTitle({ listID, newListTitle: listTitle }));
    setEditMode(false);
  };

  const handleDeleteList = () => {
    dispatch(deleteListFromListSlice(listID));
    dispatch(deleteListFromBoardSlice({ boardID: currentBoard, listID }));
  };

  const renderEditInput = () => (
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

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <div
          className={styles.listContainer}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listID)} type="card">
            {(provided) => (
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
                      <IconButton
                        aria-label="delete"
                        onClick={handleDeleteList}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cards.map((card, index) => (
                    <CardComponent
                      key={card.cardID}
                      index={index}
                      text={card.text}
                      cardID={card.cardID}
                      listID={listID}
                    />
                  ))}
                  {provided.placeholder}
                  <CreateComponent listID={listID} />
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
});

export default List;

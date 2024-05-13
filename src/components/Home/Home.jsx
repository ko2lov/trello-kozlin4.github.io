import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { addBoard, deleteBoard } from "../../features/board/boardSlice";
import { setCurrentBoard } from "../../features/currentBoard/currentBoardSlice";

export const Home = () => {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  dispatch(setCurrentBoard(null));
  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleChange = (e) => {
    if (newBoardTitle.length < 12) setNewBoardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
    setNewBoardTitle("");
  };

  const handleDeleteBoard = (e, boardID) => {
    dispatch(deleteBoard(boardID));
  };

  const renderAllBoards = () => {
    return Object.entries(boards).map(([boardID, board]) => {
      return (
        <div className={styles.thumbnail}>
          <NavLink to={`/boards/${boardID}`}>
            <h4 className={styles.title4h}>{board.boardTitle}</h4>
          </NavLink>
          <IconButton aria-label="delete">
            <DeleteIcon onClick={(e) => handleDeleteBoard(e, boardID)} />
          </IconButton>
        </div>
      );
    });
  };

  const renderCreateNewBoard = () => {
    return (
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <h3 className={styles.title}>Create new Board</h3>
        <input
          className={styles.input}
          onChange={handleChange}
          value={newBoardTitle}
          placeholder={"Enter title and Hit enter"}
          type="text"
        />
        <button className={styles.create} type="submit">
          Create
        </button>
      </form>
    );
  };

  return (
    <div className={styles.homeContainer}>
      <h3 className={styles.title}>Boards</h3>
      <div className={styles.thumbnails}>{renderAllBoards()}</div>
      {renderCreateNewBoard()}
    </div>
  );
};

export default Home;

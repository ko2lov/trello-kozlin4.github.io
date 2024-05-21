import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Home.module.css";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { addBoard, deleteBoard } from "../../features/board/boardSlice";
import { setCurrentBoard } from "../../features/currentBoard/currentBoardSlice";
import { deleteCard } from "../../features/card/cardSlice";
import { deleteList } from "../../features/list/listSlice";

export const Home = () => {
  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const lists = useSelector((state) => state.lists);
  const cards = useSelector((state) => state.cards);
  dispatch(setCurrentBoard(null));
  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value.slice(0, 12); // Обрезаем значение до 12 символов
    setNewBoardTitle(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
    setNewBoardTitle("");
  };

  const handleDeleteBoard = (e, boardID) => {
    // Получаем список и карточки, связанные с удаляемой доской
    debugger;
    const board = boards[boardID];
    const listIDs = board.lists;
    // Удаляем карточки из состояния

    listIDs.forEach((listID) => {
      const list = lists[listID];
      if (list) {
        const cardIDs = list.cards;
        debugger;
        cardIDs.forEach((cardID) => {
          if (cards[cardID]) {
            dispatch(deleteCard(cardID)); // Ваша функция для удаления карточки
          }
        });
      }
    });

    // Удаляем списки из состояния
    listIDs.forEach((listID) => {
      dispatch(deleteList(listID)); // Ваша функция для удаления списка
    });

    // Удаляем доску из состояния
    dispatch(deleteBoard(boardID));
  };

  const renderAllBoards = () => {
    return Object.entries(boards).map(([boardID, board]) => {
      return (
        <div key={boardID} className={styles.thumbnail}>
          <NavLink to={`/boards/${boardID}`}>
            <h4 className={styles.title4h}>{board.boardTitle}</h4>
          </NavLink>
          <IconButton
            aria-label="delete"
            onClick={(e) => handleDeleteBoard(e, boardID)}
          >
            <DeleteIcon />
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

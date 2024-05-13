import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Board.module.css";
import { setCurrentBoard } from "../../features/currentBoard/currentBoardSlice";
import List from "../List/List";

const Board = () => {
  const dispatch = useDispatch();

  const { boardID } = useParams();

  const { lists, cards, boards } = useSelector((state) => ({
    lists: state.lists,
    cards: state.cards,
    boards: state.boards,
  }));

  useEffect(() => {
    dispatch(setCurrentBoard(boardID));
  }, [boardID, dispatch]);

  const board = boards[boardID];
  if (!board) {
    return <h1 style={{ textAlign: "center" }}>Board not found!</h1>;
  }

  const listOrder = board.lists;
  console.log(listOrder);
  return (
    <div>
      <div className={styles.title}>{board.boardTitle}</div>
      <div className={styles.listContainer}>
        {listOrder.map((listID, index) => {
          const list = lists[listID];
          if (list) {
            const listCards = list.cards.map((cardID) => cards[cardID]);
            return (
              <List
                key={list.listID}
                listID={list.listID}
                title={list.listTitle}
                cards={listCards}
                index={index}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Board;

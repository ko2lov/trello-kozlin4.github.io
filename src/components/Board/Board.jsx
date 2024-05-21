import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Board.module.css";
import { setCurrentBoard } from "../../features/currentBoard/currentBoardSlice";
import List from "../List/List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { dragHappened } from "../../features/list/listSlice";
import CreateComponent from "../CreateComponent/CreateComponent";
import { moveCardTwo } from "../../features/list/listSlice";
import { moveList } from "../../features/board/boardSlice";

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

  // const onDragEnd = (result) => {
  //   const { destination, source, draggableId, type } = result;
  //   console.log(result);
  //   if (!destination) return;
  //   dispatch(
  //     dragHappened(
  //       source.droppableId,
  //       destination.droppableId,
  //       source.index,
  //       destination.index,
  //       draggableId,
  //       type
  //     )
  //   );
  // };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    // Проверяем, если есть destination и тип перетаскиваемого элемента - "list"
    if (destination && type === "list") {
      // Здесь обрабатываем перемещение карточки
      dispatch(
        moveList({
          boardID,
          droppableIndexStart: source.index,
          droppableIndexEnd: destination.index,
        })
      );
    }
    // Проверяем, если есть destination и тип перетаскиваемого элемента - "card"
    if (destination && type === "card") {
      // Здесь обрабатываем перемещение карточки
      dispatch(
        moveCardTwo({
          droppableIdStart: source.droppableId,
          droppableIdEnd: destination.droppableId,
          droppableIndexStart: source.index,
          droppableIndexEnd: destination.index,
          draggableId: draggableId,
        })
      );
    }
  };
  if (!board) {
    return <h1 style={{ textAlign: "center" }}>Board not found!</h1>;
  }

  const listOrder = board.lists;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.title}>{board.boardTitle}</div>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <div
            className={styles.listContainer}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
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
            {provided.placeholder}
            <CreateComponent list />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import FormComponent from "../FormComponent/FormComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {
  addCard as addCardFromListSlice,
  addList as addListFormListSlice,
} from "../../features/list/listSlice";
import AddNewButton from "../AddNewButton/AddNewButton";
import { addCard as addCardFromCardSlice } from "../../features/card/cardSlice";
import { useSelector } from "react-redux";
import { addList as addListFormBoardSlice } from "../../features/board/boardSlice";

const ListContainer = styled.div`
  border-radius: 3px;
  width: 300px;
  height: 100%;
  margin-right: 8px;
`;

const CreateComponent = ({ list, listID }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const currentBoard = useSelector((state) => state.currentBoard);
  const openForm = () => setFormOpen(true);

  const closeForm = () => {
    setFormOpen(false);
    setText("");
  };

  const handleListInputChange = (e) => {
    if (e.target.value.length <= 20) setText(e.target.value);
  };

  const handleCardInputChange = (e) => {
    if (e.target.value.length <= 150) setText(e.target.value);
  };

  const handleAddList = () => {
    if (text) {
      const listID = uuidv4();

      dispatch(
        addListFormListSlice({ listTitle: text, listID, boardID: currentBoard })
      );
      dispatch(addListFormBoardSlice({ listID, boardID: currentBoard }));
      setText("");
    }
  };

  const handleAddCard = () => {
    if (text) {
      const cardID = uuidv4();
      dispatch(addCardFromCardSlice({ text, cardID, listID }));
      dispatch(addCardFromListSlice({ listID, cardID }));

      setText("");
    }
  };

  if (list) {
    if (formOpen) {
      return (
        <ListContainer>
          <FormComponent
            text={text}
            onChange={handleListInputChange}
            closeForm={closeForm}
          >
            <ButtonComponent
              text="Add List"
              onClick={handleAddList}
            ></ButtonComponent>
          </FormComponent>
        </ListContainer>
      );
    } else {
      return (
        <ListContainer>
          <AddNewButton list={list} onClick={openForm} />
        </ListContainer>
      );
    }
  } else {
    if (formOpen) {
      return (
        <FormComponent
          text={text}
          onChange={handleCardInputChange}
          closeForm={closeForm}
        >
          <ButtonComponent
            text="Add Card"
            onClick={handleAddCard}
          ></ButtonComponent>
        </FormComponent>
      );
    } else {
      return <AddNewButton list={list} onClick={openForm} />;
    }
  }
};

export default CreateComponent;

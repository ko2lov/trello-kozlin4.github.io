import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Icon, Card, Button } from "@material-ui/core";
import Textarea from "react-textarea-autosize";

import styled from "styled-components";
import { addList } from "../../features/list/listSlice";
import { useSelector } from "react-redux";
import { addCard } from "../../features/card/cardSlice";
import { v4 as uuidv4 } from "uuid";

const OpenFormButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 3px;
  height: 36px;
  width: 300px;
  margin-left: 8px;
  padding-left: 10px;
  padding-right: 10px;
  opacity: ${(props) => props.opacity};
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
`;

const Container = styled.div`
  width: ${(props) => (props.list ? "300px" : "100%")};
`;

const StyledCard = styled(Card)`
  min-height: 85px;
  padding: 6px 8px 2px;
`;

const StyledTextarea = styled(Textarea)`
  resize: none;
  width: 100%;
  overflow: hidden;
  outline: none;
  border: none;
`;

const StyledButton = styled(Button)`
  && {
    color: white;
    background: #5aac44;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const StyledIcon = styled(Icon)`
  margin-left: 8px;
  cursor: pointer;
`;

const ActionButton = ({ list, listID }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const currentBoard = useSelector((state) => state.currentBoard);
  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setText("");
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleAddList = () => {
    if (text) {
      setText("");
      const id = uuidv4();
      dispatch(addList({ listTitle: text, listID: id, boardID: currentBoard }));
    }
  };

  const handleAddCard = () => {
    if (text) {
      setText("");
      dispatch(addCard(listID, text));
    }
  };

  const renderAddButton = () => {
    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

    return (
      <OpenFormButton
        onClick={openForm}
        opacity={buttonTextOpacity}
        color={buttonTextColor}
        background={buttonTextBackground}
      >
        <Icon>add</Icon>
        <p style={{ flexShrink: 0 }}>{buttonText}</p>
      </OpenFormButton>
    );
  };

  const renderForm = () => {
    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";
    const buttonTitle = list ? "Add List" : "Add Card";

    return (
      <Container list={list}>
        <StyledCard>
          <StyledTextarea
            placeholder={placeholder}
            autoFocus
            onBlur={closeForm}
            value={text}
            onChange={handleInputChange}
          />
        </StyledCard>
        <ButtonContainer>
          <StyledButton
            onMouseDown={list ? handleAddList : handleAddCard}
            variant="contained"
          >
            {buttonTitle}
          </StyledButton>
          <StyledIcon onClick={closeForm}>close</StyledIcon>
        </ButtonContainer>
      </Container>
    );
  };

  return formOpen ? renderForm() : renderAddButton();
};

export default ActionButton;

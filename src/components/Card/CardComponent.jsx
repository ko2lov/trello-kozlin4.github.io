import React, { useState } from "react";
// import { Typography, Card, CardContent, Icon } from "@material-ui/core";

import { Card, Icon, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Draggable } from "react-beautiful-dnd";
import {
  deleteCard as deleteCardFromCardSlice,
  editCard,
} from "../../features/card/cardSlice";
import { deleteCard as deleteCardFromListSlice } from "../../features/list/listSlice";
import { useDispatch } from "react-redux";
import styles from "./Card.module.css";
import FormComponent from "../FormComponent/FormComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const CardComponent = React.memo(({ index, text = "", cardID, listID }) => {
  const [editMode, setEditMode] = useState(false);
  const [cardText, setText] = useState(text);
  const dispatch = useDispatch();
  const closeForm = (e) => {
    setEditMode(false);
    setText(text);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const saveCard = (e) => {
    e.preventDefault();
    dispatch(editCard({ cardID, newText: cardText }));
    setEditMode(false);
  };

  const eraseCard = (e) => {
    dispatch(deleteCardFromCardSlice(cardID));

    dispatch(deleteCardFromListSlice({ cardID, listID }));
  };

  if (editMode)
    return (
      <FormComponent
        text={cardText}
        setText={setText}
        closeForm={closeForm}
        onChange={handleChange}
      >
        <ButtonComponent text="Save" onClick={saveCard} />
      </FormComponent>
    );

  return (
    <Draggable draggableId={String(cardID)} index={index}>
      {(provided) => (
        <div
          className={styles.cardContainer}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onDoubleClick={() => setEditMode(true)}
        >
          <Card>
            <EditNoteIcon
              className={styles.editButton}
              fontSize="small"
              onMouseDown={() => setEditMode(true)}
            />
            <DeleteIcon
              className={styles.deleteButton}
              fontSize="small"
              onMouseDown={eraseCard}
            />
            <CardContent>
              <Typography>{text}</Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
});
export default CardComponent;

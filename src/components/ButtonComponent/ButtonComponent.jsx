import React from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

const StyledButton = styled(Button)`
  && {
    color: white;
    background: #5aac44;
  }
`;

const ButtonComponent = ({ text, onClick }) => {
  return (
    <StyledButton variant="contained" onMouseDown={onClick}>
      {text}
    </StyledButton>
  );
};

export default ButtonComponent;

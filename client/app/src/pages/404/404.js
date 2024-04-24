import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Box, Button, Typography } from "@mui/material";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <MainBox>
      <Box>
        <Typography variant="h3">404 Page Not Found</Typography>
        <ButtonBox>
          <StyledButton onClick={() => navigate(`/`)}>
            Back to Home
          </StyledButton>
        </ButtonBox>
      </Box>
    </MainBox>
  );
};

export default ErrorPage;

const MainBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ButtonBox = styled(Box)`
  text-align: center;
`;

const StyledButton = styled(Button)`
  && {
    background-color: #ff4f00;
    color: white;
    text-transform: capitalize;
    margin-top: 30px;
    border-radius: 50px;
    padding: 8px 30px 5px;
    &:hover {
      background-color: #ff4f00;
    }
  }
`;

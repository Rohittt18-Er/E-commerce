import React from "react";
import { Box, Link, Typography } from "@mui/material";
import styled from "styled-components";

const Footer = () => {
  return (
    <MainBox>
      <CopyRightTypo variant="body2" align="center">
        Copyright &#169;{" "}
        <StyledLink color="inherit" href="/dashboard">
         ONLINE SHOP
        </StyledLink>{" "}
        {new Date().getFullYear()}
        {"."}
      </CopyRightTypo>
    </MainBox>
  );
};

export default Footer;

const MainBox = styled(Box)`
  width: 100%;
  height: auto;
  padding: 1rem 0rem;
  background: rgb(255, 79, 0);

`;

const CopyRightTypo = styled(Typography)`
  && {
    color: white;
    font-size: 15px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

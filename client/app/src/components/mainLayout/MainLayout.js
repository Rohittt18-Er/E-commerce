import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import styled from "styled-components";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import UserChatPage from "../../pages/user/UserChatPage";

const MainLayout = ({ admin }) => {
  return (
    <Wrapper>
      <Header />
      <MainDiv md={{ minHeight: "calc(100vh - 140px)" }}>
        <Outlet />
      </MainDiv>
      {!admin ? <UserChatPage /> : null}
      <Footer />
    </Wrapper>
  );
};

export default MainLayout;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainDiv = styled(Box)`
  margin-top: 10px;
  min-height: auto;
  flex-grow: 1;
`;

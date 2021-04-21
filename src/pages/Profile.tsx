import React from "react";
import styled from "styled-components";
import MenuLayout from "../components/MenuLayout";
import AvatarWithXpBar from "../components/AvatarWithXpBar";

export default function Profile() {
  return (
    <MenuLayout>
      <>
        <AvatarWithXpBar />
        <MenuTitle>History</MenuTitle>
      </>
    </MenuLayout>
  );
}

const MenuTitle = styled.span`
  align-self: flex-start;
  font-weight: bold;
  font-size: 20px;
  margin: 60px 0 0 60px;
  position: relative;
  &::before {
    background: rgba(95, 57, 0, 0.6);
    border-radius: 120px;
    content: "";
    height: 3px;
    width: 35px;
    position: absolute;
    top: 48%;
    left: -45px;
  }
`;

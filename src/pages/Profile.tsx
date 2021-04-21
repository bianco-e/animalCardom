import React from "react";
import { MenuTitle } from "../components/styled-components";
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

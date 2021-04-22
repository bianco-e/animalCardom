import React from "react";
import styled from "styled-components";
import { MenuTitle } from "../components/styled-components";
import MenuLayout from "../components/MenuLayout";
import CollectionFilter from "../components/CollectionFilter";

export default function Collection() {
  return (
    <MenuLayout>
      <>
        <CollectionFilter />
        <MenuTitle>Collection</MenuTitle>
      </>
    </MenuLayout>
  );
}

const Wrapper = styled.div``;

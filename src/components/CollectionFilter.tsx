import React from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";

const speciesDropdownOptions = [
  {
    text: "🦈",
    fn: () => {},
  },
  {
    text: "🐸",
    fn: () => {},
  },
  {
    text: "🐺",
    fn: () => {},
  },
  {
    text: "🦂",
    fn: () => {},
  },
  {
    text: "🦅",
    fn: () => {},
  },
  {
    text: "🦎",
    fn: () => {},
  },
];

const ownedDropdownOptions = [
  {
    text: "Owned",
    fn: () => {},
  },
  {
    text: "Not owned",
    fn: () => {},
  },
];

const skillDropdownOptions = [
  {
    text: "Bleed",
    fn: () => {},
  },
  {
    text: "Buff",
    fn: () => {},
  },
  {
    text: "Extra damage",
    fn: () => {},
  },
  {
    text: "Healing",
    fn: () => {},
  },
  {
    text: "Instant kill",
    fn: () => {},
  },
  {
    text: "Paralyze",
    fn: () => {},
  },
  {
    text: "Poison",
    fn: () => {},
  },
  {
    text: "Untargeteable",
    fn: () => {},
  },
  {
    text: "Other",
    fn: () => {},
  },
];

export default function () {
  return (
    <Wrapper>
      <Text>Filter cards by</Text>
      <DropdownsContainer>
        <Dropdown
          closedText="Species"
          options={speciesDropdownOptions}
          width="180px"
        />
        <Dropdown
          closedText="Owning"
          options={ownedDropdownOptions}
          width="180px"
        />
        <Dropdown
          closedText="Skill"
          options={skillDropdownOptions}
          width="180px"
        />
      </DropdownsContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 10px 10px rgba(95, 57, 0, 0.2);
  display: flex;
  justify-content: space-between;
  min-height: 80px;
  padding: 15px 60px;
  position: relative;
  width: 75%;
`;
const DropdownsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  width: 75%;
`;
const Text = styled.span`
  font-weight: bold;
  font-size: 20px;
`;

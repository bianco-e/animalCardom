import styled from "styled-components";
import Dropdown from "./Dropdown";

interface IProps {
  setSpeciesFilter: (cards: string) => void;
  setSkillTypeFilter: (cards: string) => void;
  setOwningFilter: (bool: boolean | undefined) => void;
}

export default function CollectionFilter({
  setSpeciesFilter,
  setSkillTypeFilter,
  setOwningFilter,
}: IProps) {
  const speciesDropdownOptions = [
    {
      text: "Species",
      fn: () => setSpeciesFilter(""),
    },
    {
      text: "🦈",
      fn: () => setSpeciesFilter("🦈"),
    },
    {
      text: "🐸",
      fn: () => setSpeciesFilter("🐸"),
    },
    {
      text: "🐺",
      fn: () => setSpeciesFilter("🐺"),
    },
    {
      text: "🦂",
      fn: () => setSpeciesFilter("🦂"),
    },
    {
      text: "🦅",
      fn: () => setSpeciesFilter("🦅"),
    },
    {
      text: "🦎",
      fn: () => setSpeciesFilter("🦎"),
    },
  ];

  const ownedDropdownOptions = [
    {
      text: "Owning",
      fn: () => setOwningFilter(undefined),
    },
    {
      text: "Owned",
      fn: () => setOwningFilter(true),
    },
    {
      text: "Not owned",
      fn: () => setOwningFilter(false),
    },
  ];

  const skillDropdownOptions = [
    {
      text: "Skill",
      fn: () => setSkillTypeFilter(""),
    },
    {
      text: "Bleed",
      fn: () => setSkillTypeFilter("bleed"),
    },
    {
      text: "Buff",
      fn: () => setSkillTypeFilter("buff"),
    },
    {
      text: "Dodge",
      fn: () => setSkillTypeFilter("dodge"),
    },
    {
      text: "Extra damage",
      fn: () => setSkillTypeFilter("extra_damage"),
    },
    {
      text: "Healing",
      fn: () => setSkillTypeFilter("healing"),
    },
    {
      text: "Instant kill",
      fn: () => setSkillTypeFilter("instant_kill"),
    },
    {
      text: "Paralyze",
      fn: () => setSkillTypeFilter("paralyze"),
    },
    {
      text: "Poison",
      fn: () => setSkillTypeFilter("poison"),
    },
    {
      text: "Reflect",
      fn: () => setSkillTypeFilter("reflect"),
    },
    {
      text: "Untargeteable",
      fn: () => setSkillTypeFilter("untargeteable"),
    },
    {
      text: "Other",
      fn: () => setSkillTypeFilter("other"),
    },
  ];

  return (
    <Wrapper>
      <Text>Filter by</Text>
      <DropdownsContainer>
        <Dropdown
          closedText="Species"
          options={speciesDropdownOptions}
          width="200px"
        />
        <Dropdown
          closedText="Owning"
          options={ownedDropdownOptions}
          width="200px"
        />
        <Dropdown
          closedText="Skill"
          options={skillDropdownOptions}
          width="200px"
        />
      </DropdownsContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  background-image: url("/images/welcome-background.png");
  background-size: cover;
  background-position: bottom;
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
  color: ${({ theme }) => theme.light_brown};
  font-weight: bold;
  font-size: 20px;
`;

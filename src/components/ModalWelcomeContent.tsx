import Rules from "./Rules";
import { ModalTitle, Text } from "./styled-components";

interface IProps {
  modal: string;
}
export default function ModalResultContent({ modal }: IProps) {
  return (
    <>
      {modal === "mobileDetected" ? (
        <>
          <ModalTitle>Mobile device detected</ModalTitle>
          <Text>
            You could be using Animal Cardom from a mobile device. In that case,
            we recommend to rotate the screen for a better experience
          </Text>
        </>
      ) : modal === "rules" ? (
        <>
          <ModalTitle>Animal Cardom rules</ModalTitle>
          <Rules centered={true} />
        </>
      ) : (
        modal === "terrains" && (
          <>
            <ModalTitle>Available terrains</ModalTitle>
            <Text textAlign="center" margin="0 0 10px 0">
              There are 7 different terrains. One is randomly set when game
              begins and benefits a species increasing attack by 1
            </Text>
            <Text>
              - <b>Neutral</b> doesn't buff any animal
            </Text>
            <Text>
              - <b>Swamp</b> buffs 🐸 animals
            </Text>
            <Text>
              - <b>Desert</b> buffs 🦂 animals
            </Text>
            <Text>
              - <b>Mountain</b> buffs 🦅 animals
            </Text>
            <Text>
              - <b>Sea</b> buffs 🦈 animals
            </Text>
            <Text>
              - <b>Forest</b> buffs 🦎 animals
            </Text>
            <Text>
              - <b>Jungle</b> buffs 🐺 animals
            </Text>
          </>
        )
      )}
    </>
  );
}

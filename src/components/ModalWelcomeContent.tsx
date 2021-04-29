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
          <Text textAlign="center" margin="10px 0 5px 0">
            You will get <b>five different random animals cards</b>, and{" "}
            <b>three different plants</b> to apply on them (or enemies) if
            wanted. A <b>terrain</b> will be also randomly set at the very
            beginning.
          </Text>
          <Text textAlign="center" margin="5px 0 10px 0">
            Each card has an <b>ability</b>, an <b>attack</b> and{" "}
            <b>life points</b>, and also belongs to a <b>species</b> which can
            give you benefits or not depending on the terrain or other cards'
            abilities. The objective is to kill all opponent's cards.{" "}
            <b>Have fun!</b>
          </Text>
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

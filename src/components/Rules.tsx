import { Text } from "./styled-components";

interface IProps {
  centered?: boolean;
}
export default function Rules({ centered }: IProps) {
  return (
    <>
      <Text textAlign={centered ? "center" : "left"} margin="5px 0">
        A <b>terrain</b> will be set at the very beginning affecting (or not)
        some animals.
      </Text>
      <Text textAlign={centered ? "center" : "left"} margin="5px 0">
        Each player gets <b>five different animals</b>, and{" "}
        <b>three different plants</b> which can be used to apply on animals.
      </Text>
      <Text textAlign={centered ? "center" : "left"} margin="5px 0">
        Each animal has an <b>ability</b> which can be offensive (activated when
        attacking) or defensive (activated when it's attacked),{" "}
        <b>attack points</b> and <b>life points</b>, also each animal belongs to
        a <b>species</b> which can give you benefits or not depending on the
        terrain or other cards' abilities. Select an owned animal and click an
        opponent to attack.
      </Text>
      <Text textAlign={centered ? "center" : "left"} margin="5px 0">
        Hover on <b>plants</b> to see what they do. Click a plant and then click
        an animal to apply it. <b>Buffing/healing plants</b> can only be applied
        on allies and <b>offensive plants</b> can only be applied on enemies.
      </Text>
      <Text textAlign={centered ? "center" : "left"} margin="5px 0">
        The objective is to kill all opponent's animals. <b>Have fun!</b>
      </Text>
    </>
  );
}

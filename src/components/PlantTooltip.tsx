import styled from "styled-components";

interface IProps {
  belongsToUser: boolean;
  description: string;
  appliableOn: string;
}

export default function PlantTooltip({
  belongsToUser,
  description,
  appliableOn,
}: IProps) {
  return (
    <Tooltip belongsToUser={belongsToUser}>
      <div className="top-container">
        <span>{description}</span>
      </div>
      <hr />
      <div className="bottom-container">
        <span>
          Appliable on <b>{appliableOn}</b>
        </span>
      </div>
    </Tooltip>
  );
}

interface TooltipProps {
  belongsToUser: boolean;
}

const Tooltip = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  margin-left: -49px;
  width: 98px;
  z-index: 3;
  ${(p: TooltipProps) =>
    p.belongsToUser
      ? `bottom: 120%; flex-direction: column;`
      : `top: 120%; flex-direction: column-reverse;`};
  > hr {
    background: ${({ theme }) => theme.xp_secondary_violet};
    border: 1px solid ${({ theme }) => theme.xp_secondary_violet};
    margin: 0;
    width: calc(100% - 2px);
  }
  > div {
    align-items: center;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
    display: flex;
    font-size: 9px;
    justify-content: center;
    text-align: center;
  }
  .top-container {
    background: ${({ theme }) => theme.light_brown};
    padding: 5px 2px;
    width: 100%;
    ${(p: TooltipProps) =>
      p.belongsToUser
        ? `border-radius: 5px 5px 0 0;`
        : ` border-radius: 0 0 5px 5px`};
  }
  .bottom-container {
    background: ${({ theme }) => theme.primary_brown};
    font-size: 8px;
    padding: 5px 0;
    position: relative;
    width: 100%;
    ${(p: TooltipProps) =>
      p.belongsToUser
        ? `border-radius: 0 0 5px 5px;`
        : ` border-radius:  5px 5px 0 0;`};
    &::after {
      background: ${({ theme }) => theme.primary_brown};
      ${(p: TooltipProps) =>
        p.belongsToUser ? `bottom: -4px;` : `top: -4px;`};
      content: "";
      height: 8px;
      left: 50%;
      margin-left: -4px;
      position: absolute;
      transform: rotate(45deg);
      width: 8px;
    }
  }
`;

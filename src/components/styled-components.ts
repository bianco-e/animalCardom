import styled from "styled-components";

interface ButtonProps {
  fWeight?: string;
  selected?: boolean;
}
interface TextProps {
  color?: string;
  fSize?: string;
  fWeight?: string;
  margin?: string;
  padding?: string;
  textAlign?: string;
}
interface ImageProps {
  height?: string;
  width?: string;
}

export const Text = styled.span`
  color: ${(p: TextProps) => p.color};
  font-size: ${(p: TextProps) => p.fSize};
  font-weight: ${(p: TextProps) => p.fWeight};
  margin: ${(p: TextProps) => p.margin};
  padding: ${(p: TextProps) => p.padding};
  text-align: ${(p: TextProps) => p.textAlign};
`;

export const Image = styled.img`
  height: ${(p: ImageProps) => p.height};
  width: ${(p: ImageProps) => p.width};
`;

export const ACButton = styled.button`
  background-color: ${(p: ButtonProps) => (p.selected ? "#d4a257" : "#b9935a")};
  border: 2px solid #b9935a;
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px black;
  color: black;
  cursor: pointer;
  height: 60px;
  font-size: 20px;
  font-weight: ${(p: ButtonProps) => p.fWeight};
  padding: 6px 10px;
  position: relative;
  width: 100%;
  &:disabled {
    background: rgba(185, 147, 90, 0.3);
    cursor: not-allowed;
  }
`;

export const LogButton = styled.button`
  border: 2px solid #b9935a;
  border-radius: 5px;
  box-shadow: inset 0px 0px 3px black;
  cursor: pointer;
  font-size: 18px;
  margin-right: 20px;
  padding: 6px 15px;
`;

export const ComingSoon = styled.span`
  background: #000;
  border-radius: 5px;
  color: #fff;
  font-size: 11px;
  padding: 3px 10px;
  position: absolute;
  right: -10px;
  top: 10px;
  transform: rotate(20deg);
`;

export const MenuTitle = styled.span`
  align-self: flex-start;
  font-weight: bold;
  font-size: 20px;
  margin: 60px 0 0 8%;
  position: relative;
  &::before {
    background: rgba(95, 57, 0, 0.6);
    border-radius: 120px;
    content: "";
    height: 3px;
    width: 80px;
    position: absolute;
    top: 48%;
    left: -90px;
  }
`;

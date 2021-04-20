import styled from "styled-components";

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

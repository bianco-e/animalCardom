import styled from "styled-components";

export const Text = styled.span`
  color: ${({ color }) => color};
  font-size: ${({ fSize }) => fSize};
  font-weight: ${({ fWeight }) => fWeight};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  text-align: ${({ textAlign }) => textAlign};
`;

export const Image = styled.img`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;

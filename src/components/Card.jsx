import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../context";
const Container = styled.div`
  display: flex;
  padding: 10px;
  background-color: lightblue;
  border: solid 1px blue;
  margin: 10px;

  &:hover {
    box-shadow: 1px 1px 8px black;
  }
`;

const Checkbox = styled.input`
  margin-right: 20px;
`;

const Navigation = styled.div`
  margin-left: auto;
`;

const Label = styled.label`
  align-self: center;
`;

export const Card = function ({ move, item }) {
  const {toggle} = useContext(AppContext);

  return (
    <Container>
      <Label>
        <Checkbox
          type="checkbox"
          onClick={() => toggle(item)}
          defaultChecked={item.checked}
        />
        {item.name}
      </Label>
      <Navigation>
        <button onClick={() => move(item.pos, item.pos - 1)}>▲</button>
        <button onClick={() => move(item.pos, item.pos + 1)}>▼</button>
      </Navigation>
    </Container>
  );
};

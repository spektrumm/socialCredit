import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import useWindowDimensions from "../useWindowsDimentions";

export const SearchBar = () => {
  const { height, width } = useWindowDimensions();

  return (
    <Form>
      <FormGroup style={{ paddingTop: 100, paddingRight: width / 8 }}>
        <Label style={{ color: "white", fontSize: 18, padding: 5 }}>
          Search User
        </Label>
        <Input
          style={{
            backgroundColor: "#1B1B27",
            fontSize: 18,
            color: "white",
            borderStyle: "solid",
            borderRadius: 5,
          }}
          type="text"
          placeholder="Proto"
        />
      </FormGroup>
    </Form>
  );
};

export default SearchBar;

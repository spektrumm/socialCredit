import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import useWindowDimensions from "../useWindowsDimentions";
import { GetUsersByName } from "../../requests";
import { Link } from "react-router-dom";


//userName search bar
export const SearchBar = () => {
  const { height, width } = useWindowDimensions();
  const [result, setResult] = useState([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (inputValue == "") {
      setResult([]);
    } else {
      GetUsersByName(inputValue).then((result) => {
        setResult(result);
      });
    }
  }, [inputValue]);
  // <FormGroup style={{ paddingTop: 80, paddingRight: width / 8 }}>

  return (
    <Form>
      <FormGroup>
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
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <div style={{ zIndex: 10, position: "absolute", paddingLeft: 150 }}>
          {result.map((data) => (
            <Link
              to={"/user/" + data.name}
              onClick={(clicked) => {
                setInputValue("");
              }}
              style={{
                fontSize: 18,
                color: "white",
                display: "flex",
                textDecoration: "none",
                paddingTop: 5,
              }}
              key={data.name}
            >
              {data.name}
            </Link>
          ))}
        </div>
      </FormGroup>
    </Form>
  );
};

export default SearchBar;

import React, { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu } from "reactstrap";
import { GetUserByName } from "../../requests";


  //UNUSED !!!!!!!!!!!!!!!!!!!!!!!!!!!
  //UNUSED !!!!!!!!!!!!!!!!!!!!!!!!!!!
  //UNUSED !!!!!!!!!!!!!!!!!!!!!!!!!!!
  //UNUSED !!!!!!!!!!!!!!!!!!!!!!!!!!!
  //UNUSED !!!!!!!!!!!!!!!!!!!!!!!!!!!
const SearchResults = (searchValue) => {
  if (searchValue.length == 0) {
    return <></>;
  }

  let requestData = GetUserByName(searchValue);

  requestData.then((result) => {
    return result;
  });
};

export default SearchResults;

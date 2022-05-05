import React, { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu } from "reactstrap";
import { GetUserByName } from "../../requests";


  //UNUSED !!!!!!!!!!!!!!!!!!!!!!!!!!!
  //UNUSED !!!!!!!!!!!!!!!!!!!!!!!!!!!
  //UNUSED !!!!!!!!!!!!!!!!!!!!!!!!!!!
  //UNUSED !!!!!!!!!!!!!!!!!!!!!!!!!!!
  //UNUSED !!!!!!!!!!!!!!!!!!!!!!!!!!!
const SearchResults = (searchValue) => {
  //const [users, setUsers] = useState([]);

  if (searchValue.length == 0) {
    return <></>;
  }

  let requestData = GetUserByName(searchValue);

  requestData.then((result) => {
    console.log(result);
    return result;
    //setUsers(result);
  });
  //return users;

  //   return (
  //     <Dropdown isOpen={true}>
  //       <DropdownMenu>
  //         {users.map((data) => (
  //           <DropdownItem key={data.name}> {data.name}</DropdownItem>
  //         ))}
  //       </DropdownMenu>
  //     </Dropdown>
  //   );
};

export default SearchResults;

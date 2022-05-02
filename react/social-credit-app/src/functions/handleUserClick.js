import { Link } from "react-router-dom";

const handleUserClick = (userName) => {
  console.log("user Click -- ", userName);
  return <Link to={"/user/" + userName}>{userName}</Link>;
};

export default handleUserClick;

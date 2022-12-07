import { Link } from "react-router-dom";

const handleUserClick = (userName) => {
  return <Link to={"/user/" + userName}>{userName}</Link>;
};

export default handleUserClick;

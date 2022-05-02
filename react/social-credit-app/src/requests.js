import axios from "axios";

const GetTopUsers = () => {
  return axios
    .get(`http://localhost:8080/data/getTopUsers`)
    .then((res) => res.data);
};

const GetBottomUsers = () => {
  return axios
    .get(`http://localhost:8080/data/getBottomUsers`)
    .then((res) => res.data);
};

const GetUsersByName = (userName) => {
  return axios
    .get(`http://localhost:8080/data/getUsers/` + userName)
    .then((res) => res.data);
};

const GetUserDataByName = (userName) => {
  return axios
    .get(`http://localhost:8080/data/getUserData/` + userName)
    .then((res) => res.data);
};

export { GetTopUsers, GetBottomUsers, GetUsersByName, GetUserDataByName };

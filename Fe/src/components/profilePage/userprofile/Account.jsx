import { React, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../userprofile/Account.css";
import axios from "axios";
import { Store } from "../../../Store";

const Account = () => {
  const store = useContext(Store);

  //dữ liệu user
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(
          `http://localhost:8080/api/v1/users/${store.currentUser._id}`
        );
        setUserData(userResponse.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <div>...Loading</div>;
  }

  const formatDate = (d) => {
    if (d != null) {
      const date = new Date(d);
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }
    return null;
  };

  return (
    <div className="account">
      <div className="form">
        <div className="avatar">
          <img src={userData.avatar} alt="" />
        </div>
        <div className="text">
          <p>User name: {userData.username} </p>
          <p>Email: {userData.email} </p>
          <p>Role: {userData.role} </p>
          <p>Full name: {userData.fullname} </p>
          <p>Date of birth: {formatDate(userData.dateOfBirth)} </p>
          <p>Address: {userData.address} </p>
          <p>Phone: {userData.phoneNumber} </p>
        </div>
      </div>
    </div>
  );
};

export default Account;

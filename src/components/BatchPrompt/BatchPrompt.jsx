import React, { useEffect, useState } from "react";
import "./BatchPrompt.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import "react-modern-drawer/dist/index.css";
import { getPostsCount } from "../../actions/posts";

//Components import
import Notifications from "../MainPageWindow/MainPageWindow";
import Sidebar from "../Sidebar/Sidebar"

const BatchPrompt = () => {
  const location = useLocation();
  var screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (!user) {
      toast.error("Please Login to continue!");
    }
    dispatch(getPostsCount());
  }, [dispatch, user, location]);

  return (
    <>
      <div className="mainContainer">
        <div className="sideBar_maincontainer">
          <Sidebar/>
        </div>
        <div className="noti_maincontainer">
          <Notifications />
        </div>
      </div>
    </>
  );
};

export default BatchPrompt;

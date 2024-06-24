import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import {toast} from 'react-hot-toast';
import images from "../../constants/images";
import decode from "jwt-decode";

import * as Icons from "../icons"

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (user && 
    <div className="sidebar_container">
        <ul>
            <div className="group">
                <li>
                    {
                        user && (
                            <button className="ProjectPart">
                                <Link to="/profile" className="projectPart">
                                    <span className = "iconportion">{Icons.ProfileIcon}</span>
                                    <span className="textportion">Profile</span>
                                </Link>
                            </button>
                        )
                    }
                </li>

                <li>
                    {
                        user && (
                            <button className="ProjectPart">
                                <Link to="/leaderboard" className="projectPart">
                                    <span className = "iconportion">{Icons.LeaderboardIcon}</span>
                                    <span className="textportion">Leaderboard</span>
                                </Link>
                            </button>
                        )
                    }
                </li>
            </div>

            <div className="group">
                <div className="group-header">
                    <h2>Practice</h2>
                    <div className="line"></div>
                </div>
                <li>
                    {
                        user && (
                            <button className="title">
                                <Link to="/answer-questions" className="projectPart">
                                    <span className = "iconportion">{Icons.QuestionIcon}</span>
                                    <span className="textportion">dSAT Math</span>
                                </Link>
                            </button>
                        )
                    }
                </li>
            </div>

            <div className="group">
                <div className="group-header">
                    <h2>Games</h2>
                    <div className="line"></div>
                </div>
                <li>
                    {
                        user && (
                            <button className="ProjectPart">
                                <Link to="/plinko" className="projectPart">
                                    <span className = "iconportion">{Icons.PlinkoIcon}</span>
                                    <span className="textportion">Plinko</span>
                                </Link>
                            </button>
                        )
                    }
                </li>

                <li>
                    {
                        user && (
                            <button className="ProjectPart">
                                <Link to="/crash" className="projectPart">
                                    <span className = "iconportion">{Icons.RocketIcon}</span>
                                    <span className="textportion">Crash</span>
                                </Link>
                            </button>
                        )
                    }
                </li>
            </div>
            <div className="group">
                <div className="group-header">
                    <h2>Support</h2>
                    <div className="line"></div>
                </div>
                <li>
                    {
                        user && (
                            <button className="title">
                                <Link to="/contactMe" className="projectPart">
                                    <span className = "iconportion">{Icons.FeedbackIcon}</span>
                                    <span className="textportion">Feedback</span>
                                </Link>
                            </button>
                        )
                    }
                </li>
            </div>
        </ul>
    </div>
  );
};

export default Sidebar;

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

  return (
    <div className="sidebar_container">
        <ul>
            <li>
                {
                    user && (
                        <button className="ProjectPart">
                            <Link to="/answer-questions" className="projectPart">
                                <Tooltip title='Answer Questions' arrow>{Icons.QuestionIcon}</Tooltip>
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
                                <Tooltip title='Play Crash' arrow>{Icons.RocketIcon}</Tooltip>
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
                                <Tooltip title="Leaderboard" arrow>{Icons.LeaderboardIcon}</Tooltip>
                            </Link>
                        </button>
                    )
                }
            </li>

            <li>
                {
                    user && (
                        <button className="ProjectPart">
                            <Link to="/profile" className="projectPart">
                                <Tooltip title="Profile" arrow>{Icons.ProfileIcon}</Tooltip>
                            </Link>
                        </button>
                    )
                }
            </li>

            <li>
                {
                    user && (
                        <button className="ProjectPart">
                            <Link to="/plinko" className="projectPart">
                                <Tooltip title="Play Plinko" arrow>{Icons.PlinkoIcon}</Tooltip>
                            </Link>
                        </button>
                    )
                }
            </li>
        </ul>
    </div>
  );
};

export default Sidebar;

import React, { useEffect, useState } from "react";
import "./Navbar1.css";
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
import {getMoney, getTickets} from '../../actions/posts';

const Navbar1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [curMoney, setCurMoney] = useState(0);
  const [curTickets, setCurTickets] = useState(0);

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const creatorNAME = user?.result?.name;
  const creatorID = user?.result?.googleId || user?.result?._id;

  function truncateToDecimals(num, dec = 2) {
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
  }
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    const refresh = async () => {
      const userMoney = await getMoney(user?.result?._id);
      const userTickets = await getTickets(user?.result?._id);
      try {
        setCurMoney(truncateToDecimals(parseFloat(userMoney.money.$numberDecimal)).toLocaleString('en', {useGrouping:true}));
        setCurTickets(parseInt(userTickets.tickets));
      } catch (error) {
        console.log(error);
      }
    }
    if (user) {
      refresh();
    }

    // Set up an interval to call refreshMoney every 3 second
    const intervalId = setInterval(refresh, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [location]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl((prevState) => !prevState);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <nav>
      <div className="navContainer">
        <div className="logoContainer">
          <img src="hyraxLogoCircle.png" width={50} height={50}/>
        </div>
        <Link to="/" className="logo">
          Hyrax
        </Link>
        {user && (
            <div className="ticket_container">
              <div className="ticket_image_container">
                <Tooltip title='Tickets' arrow>
                  <img src = {images.ticketIcon} width={28} height={28}/>
                </Tooltip>
              </div>
              <div className="ticket_amount_container">
                {curTickets}
              </div>
            </div>
          )
        }

        {user && (
            <div className="money_container">
              <div className="money_image_container">
                <Tooltip title='Hybux' arrow>
                  <img src = {images.coinIcon} width={28} height={28}/>
                </Tooltip>
              </div>
              <div className="money_amount_container">
                {curMoney}
              </div>
            </div>
          )
        }

        <div className="profilepic">
          {user ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                backgroundcolor="grey"
              >
                <img
                  src={
                    user.result.imageUrl ? user.result.imageUrl : images.userPic
                  }
                  alt={"profile"}
                  id="profileImg"
                />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)} 
                onClick={() => setAnchorEl(null)}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
              >
                <MenuItem>
                  <Avatar /> {user?.result?.name}
                </MenuItem>

                <Divider />
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div className="sign">
              <Link to="/auth" className="Signin">
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;

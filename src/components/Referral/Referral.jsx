import React, { useState } from "react";
import "./Referral.css";
import { Link, useNavigate } from "react-router-dom";
import { referral } from "../../actions/auth";
import { useForm, ValidationError } from "@formspree/react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Referral = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [state, handleSubmit] = useForm("moqoyevn");
  const initialState = { email: user.result.email, referredEmail: ""};
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if(state.succeeded)
  {
    dispatch(referral(formData, navigate));
  }


  return (
    <div className="contactMe_mainContainer">
      <div className="contactMe_header">Thank you for your Referral! (Claim 25 tickets each when 10 problems solved on referred account)</div>
      <div className="contact_container">
        <form onSubmit={handleSubmit} style={{width : '100%'}}>
        <div className="contact_inputs">
          <div className="email">
            <input
              type="email"
              className="emailInput"
              placeholder="Enter the email address of who you are referring"
              id="referredEmail"
              name="referredEmail"
              onChange={handleChange}
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div className="contact_buttons">
            <Link
              to="/"
              className="sendButton"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
              Home Page
            </Link>

            <Link
              to="/referralView"
              className="sendButton"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
              }}
            >
                Progress
            </Link>
            <button className="sendButton" type="submit" disabled={state.submitting}>
                Send
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Referral;

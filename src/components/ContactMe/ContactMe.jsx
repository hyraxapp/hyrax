import React from "react";
import "./ContactMe.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";
import toast from "react-hot-toast";

const ContactMe = () => {
  const [state, handleSubmit] = useForm("moqoyevn");
  const navigate = useNavigate();

  if(state.succeeded)
  {
    toast.success("Feedback Submitted Successfully 🎉");
    navigate('/');
  }


  return (
    <div className="contactMe_mainContainer">
      <div className="contactMe_header">Thank you for your feedback!</div>
      <div className="contact_container">
        <form onSubmit={handleSubmit} style={{width : '100%'}}>
        <div className="contact_inputs">
          <div className="email">
            <input
              type="email"
              className="emailInput"
              placeholder="Enter your email address"
              id="email"
              name="email"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div className="feedback">
            <textarea
              rows="10"
              type="text"
              className="feedBackInput"
              placeholder="Enter your valuable feedback"
              id="message"
              name="message"
            />
            <ValidationError
              prefix="Message"
              field="message"
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
              Back to Home Page
            </Link>
            <button className="sendButton" type="submit" disabled={state.submitting}>
                SEND
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ContactMe;

import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <div className="item">
      <img
        className="ui avater image"
        src={user}
        alt="user"
        style={{ height: "30px" }}
      />
      <div className="content">
        <link to ={{pathname:`/contact/${id}`,state:{contact:props.contact}}}>
        <div className="header">{name}</div>
        <div>{email}</div>
        </link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft:"10px" }}
        onClick={() => props.clickHander(id)}
      ></i>
              <link to ={{pathname:`/edit`,state:{contact:props.contact}}}>

      <i
        className="edit alternate outline icon"
        style={{ color: "blue", marginTop: "7px" }}
        
      ></i>
      </link>
    </div>
  );
};

export default ContactCard;

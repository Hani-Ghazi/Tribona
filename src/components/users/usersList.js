import React from "react";
import defaultUserImage from "../../assets/images/robert.jpeg";


const renderUserCard = (user) => (
  <div className="col-lg-3 col-sm-6 col-12 mx-auto my-3">
    <img className="team-holder circle  mx-auto svgcenter" src={defaultUserImage} alt="image"/>
    <h6 className="mt-4 mb-0 text-center"><strong className="black">{`${user.firstName} ${user.lastName}`}</strong></h6>
    <p className="mb-2 subheading black text-center grey">{user.email}</p>
    <ul className="text-center">
      <li className="list-inline-item"><a href="http://www.facebook.com"><i className="fab fa-facebook-f"/></a>
      </li>
      <li className="list-inline-item"><a href="http://www.twitter.com"><i className="fab fa-twitter"/></a></li>
      <li className="list-inline-item"><a href="http://www.instagram.com"><i className="fab fa-instagram"/></a>
      </li>
    </ul>
  </div>
);


const usersList = ({ users }) => (
  <div className="row">
    {
      (users || []).map(user => renderUserCard(user))
    }
  </div>
);

export default usersList;
import React from "react";
import { useNavigate } from "react-router-dom";

function Doctor({ doctor }) {
  const navigate = useNavigate();
  return (
    <div
      className="card p-3 cursor-pointer"
      onClick={() => navigate(`/book-appointment/${doctor._id}`)}
    >
      <h1 className="card-title">
        {doctor.firstName} {doctor.lastName}
      </h1>
      <hr className="color : grey" />
      <p>
        <b>Contact :</b> {doctor.phoneNumber}
      </p>
      <p>
        <b>Address :</b> {doctor.address}
      </p>
      <p>
        <b>Experience:</b> {doctor.experience}
      </p>
      <p>
        <b>Fee/visit :</b> {doctor.feePerConsultation}
      </p>
      <p>
        <b>Timing :</b> {doctor.timings[0]} to {doctor.timings[1]}
      </p>
    </div>
  );
}

export default Doctor;

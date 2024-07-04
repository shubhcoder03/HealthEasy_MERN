import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import axios from "axios";
//import moment from "moment";
import dayjs from "dayjs";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import toast from "react-hot-toast";

function BookAppointment() {
  // eslint-disable-next-line no-unused-vars
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctors/get-doctors-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const checkAvailabality = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/check-booking-availability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(hideLoading());
    }
  };

  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/users/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/appointments")
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getDoctorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr style={{ color: "grey" }} />
          <Row gutter={20} className="mt-5" align="middle">
          <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://img.freepik.com/premium-vector/book-now-banner-white-background_579179-1366.jpg"
                alt=""
                width = "100%"
                height="300"
              />
            </Col>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings :</b> {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
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
                <b>Website :</b> {doctor.website}
              </p>
              <div className="d-flex flex-column mt-2 pt-3">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(dayjs(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(dayjs(value).format("HH:mm"));
                  }}
                />
                {!isAvailable && <Button
                  className="primary-button mt-4"
                  onClick={checkAvailabality}
                >
                  Check Availability
                </Button>}
                {isAvailable && (
                  <Button className="primary-button mt-4" onClick={bookNow}>
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
            
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;

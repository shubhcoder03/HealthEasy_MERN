import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";
//import {toast} from "react-hot-toast";
import moment from "moment";


function Appointments() {
    const [appointments, setAppointments] = useState();
    const dispatch = useDispatch();
    const getAppointmentsData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get("/api/users/get-appointments-by-user-id", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(hideLoading());
        if (response.data.success) {
          setAppointments(response.data.data);
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    };

    const columns = [
        {
            title : "Id",
            dataIndex:"_id",
        },
        {
          title: "Doctor",
          dataIndex: "name",
          render: (text, record) => (
            <span className="normal-text">
              {record.doctorInfo.firstName} {record.doctorInfo.lastName}
            </span>
          ),
        },
        {
          title: "Phone",
          dataIndex: "phoneNumber",
          render: (text, record) => (
            <span className="normal-text">
              {record.doctorInfo.phoneNumber}
            </span>
          ),
        },
        {
          title: "date & time",
          dataIndex: "createdAt",
          render: (text, record) => (
            <span className="normal-text">
              {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}
            </span>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
        }
      ];

    useEffect(() => {
        getAppointmentsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
  return (
    <Layout>
    <h1 className="page-title">Appointments List</h1>
    <Table className="normal-text" columns={columns} dataSource={appointments} />
    </Layout>
  )
}

export default Appointments
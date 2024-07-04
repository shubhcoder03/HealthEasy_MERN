import React, { useEffect, useState } from "react"
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
function Userslist(){
    const [user, setUser] = useState(); 
    const dispatch = useDispatch();
    const getUserData=async()=>{
        try{
            dispatch(showLoading());
            const response = await axios.get('/api/admin/get-all-users',{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if(response.data.success){
                setUser(response.data.data);
            }
        }catch(error){
            dispatch(hideLoading());
        }
    }
    useEffect(()=>{
        getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const columns = [
        {
            title : 'Name',
            dataIndex : 'name',
        },
        {
            title : 'Email',
            dataIndex : 'email',
        },
        {
            title : 'Created At',
            dataIndex : 'createdAt',
            render : (record,text) => moment(record.createdAt).format("DD-MM-YYYY")
        },
        {
            title : 'Actions',
            dataIndex : 'actions',
            render:(text,record)=>(
                <div className="d-flex">
                    <h1 className="anchor">Block</h1>
                </div>
            ),
        },
    ];
    return (
        <Layout>
            <h1 className="page-title">Users List</h1>
            <Table className="normal-text" columns={columns} dataSource={user}/>
        </Layout>
    );
}

export default Userslist;
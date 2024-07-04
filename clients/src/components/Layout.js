import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../layout.css";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  //console.log();
  // eslint-disable-next-line no-unused-vars
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointment",
      path: "/appointments",
      icon: "ri-article-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
  ];
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointment",
      path: "doctor/appointments",
      icon: "ri-article-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-3-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-team-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-nurse-fill",
    },
    
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const role = user?.isAdmin?"Admin" : user?.isDoctor?"Doctor" : "User";
  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">HE</h1>
            <h1 className="role">{role}</h1>
            <div className="menu">
              {menuToBeRendered.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    className={`d-flex menu-item ${
                      isActive && "active-menu-item"
                    }`}
                  >
                    <i className={menu.icon}></i>
                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                  </div>
                );
              })}
              <div
                className={`d-flex menu-item`}
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <i className="ri-logout-circle-line"></i>
                {!collapsed && <Link to="/login">Logout</Link>}
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-circle-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-3" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;

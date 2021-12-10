import React from "react";
import logo from "../../assets/images/logo_nobg_black.png";
import "./css/Sidebar.css";

const Sidebar = (props) => {
	const handleLogoClick = () => {
		window.location.href = "/client";
	};
	return (
		<>
			<div className="sidebar-sticky">
				<div
					className="text-center"
					style={{ background: "#ffded1", height: "100vh" }}
				>
					<img
						onClick={handleLogoClick}
						width="80%"
						style={{ marginTop: "40px", cursor: "pointer" }}
						src={logo}
						alt="logo"
					/>
					<ul className="menu-list">
						<li
							onClick={() => {
								window.location.href = props.url;
							}}
							className="menu-list-item-admin"
						>
							Profile
						</li>
						<li
							onClick={() => {
								window.location.href = `${props.url}/addCharity`;
							}}
							className="menu-list-item-admin"
						>
							Add Charity
						</li>
						<li
							onClick={() => {
								window.location.href = `${props.url}/editCharity`;
							}}
							className="menu-list-item-admin"
						>
							Remove Charity
						</li>
						<li onClick={props.handleLogout} className="menu-list-item-admin">
							Logout
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Sidebar;

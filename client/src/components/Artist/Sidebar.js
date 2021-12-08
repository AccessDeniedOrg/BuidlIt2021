import React from "react";
import logo from "../../assets/images/logo_nobg_peach.png";
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
					style={{ background: "#000", height: "100vh" }}
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
							className="menu-list-item"
						>
							Profile
						</li>
						<li
							onClick={() => {
								window.location.href = `${props.url}/minting`;
							}}
							className="menu-list-item"
						>
							Mint NFT
						</li>
						<li
							onClick={() => {
								window.location.href = `${props.url}/nftcollection`;
							}}
							className="menu-list-item"
						>
							NFT Collection
						</li>
						<li
							onClick={() => {
								window.location.href = `${props.url}/transactions`;
							}}
							className="menu-list-item"
						>
							Transactions
						</li>
						<li onClick={props.handleLogout} className="menu-list-item">
							Logout
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Sidebar;

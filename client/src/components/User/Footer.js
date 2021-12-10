import React, { Component } from "react";
import brandLogo from "../../assets/images/logo_nobg_black.png";
import { FaGithub } from "react-icons/fa";
import "./Footer.css";

class Footer extends Component {
	render() {
		return (
			<>
				<div className="me-footer">
					<div className="container">
						<div className="row">
							<div className="col-lg-3 col-md-6 col-sm-6">
								<div className="me-footer-block">
									<div className="me-logo">
										<a href="/client">
											<img
												src={brandLogo}
												alt="logo"
												style={{
													width: "350px",
													marginTop: "-30px",
													marginLeft: "-30px",
												}}
												className="img-fluid"
											/>
										</a>
									</div>
									<ul>
										<li
											style={{ marginTop: "10px" }}
											className="me-footer-emial"
										>
											accessdeniedbuidl@gmail.com
										</li>
										<li>Powered By AccessDenied.</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-6">
								<div className="me-footer-block">
									<h4>Reach Out To Us</h4>
									<ul style={{ marginTop: "-15px" }}>
										<li>
											<a
												target="_blank"
												rel="noreferrer"
												href="https://www.linkedin.com/in/sanchita-s-51393b182/"
											>
												Sanchita Shirur
											</a>
										</li>
										<li>
											<a
												target="_blank"
												rel="noreferrer"
												href="https://www.linkedin.com/in/tarang-padia-b407591a0/"
											>
												Tarang Padia
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-6">
								<div className="me-footer-block">
									<h4>Join Us</h4>
									<ul style={{ marginTop: "-15px" }}>
										<li>
											<a href="/client/donate">Donate Today</a>
										</li>
										<li>
											<a href="/auth-artist">Add Your Art</a>
										</li>
										<li>
											<a href="/listing">List Your Campaign</a>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-6">
								<div className="me-footer-block">
									<h4>View Source Code</h4>
									<ul style={{ marginTop: "-15px" }} className="me-footer-share">
										<li>
											<a
												target="_blank"
												rel="noreferrer"
												style={{ fontSize: "25px" }}
												href="https://github.com/AccessDeniedOrg/BuidlIt2021"
											>
												<FaGithub />
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="me-footer-copyright">
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<div className="me-copyright-block">
									<p>
										&copy; 2021 copyright all right reserved by{" "}
										<a href="/client">GrantéStudio</a>
									</p>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="me-copyright-block">
									<ul>
										<li>
											<a href="/client">Privacy Policy</a>
										</li>
										<li>
											<a href="/client">Terms & condition</a>
										</li>
										<li>
											<a href="/client">FAQ</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Footer;

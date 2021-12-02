import React, { useState } from "react";
import "./css/Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
	let [currentPage, setCurrentPage] = useState(1)
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="pagination-nav">
			<ul className="pagination text-center">
				{pageNumbers.map((number) => (
					<li key={number} className={currentPage === number ? "page-item active" : "page-item"}>
						<a
							href="#page"
							onClick={() => {
								paginate(number)
								setCurrentPage(number)
								console.log(number)
							}}
							className="page-link page-numbers"
						>
							{number}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;

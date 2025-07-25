import React from "react";

const Search = ({ search, setSearch }) => {
	return (
		<div className="col-sm-6 mb-4">
			<form onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="employeeSearch" className="form-label visually-hidden">
					Search employees
				</label>
				<input
					id="employeeSearch"
					className="form-control"
					type="search"
					role="searchbox"
					placeholder="Search employees..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default Search;
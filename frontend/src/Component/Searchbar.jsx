import React from "react";

function Searchbar() {
  return (
    <div className="container mt-3">
      <div className="d-flex align-items-center gap-3 w-100">

        <input
          type="search"
          className="form-control form-control-dark text-bg-dark"
          placeholder="Ask New Question"
          aria-label="Search"
          style={{ maxWidth: "20%" }}
        />
        <div className="input-group" style={{ maxWidth: "40%" }}>
          <input
            type="search"
            className="form-control form-control-dark text-bg-dark"
            placeholder="Ask New Question"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-light dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            More
          </button>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action 1</a></li>
            <li><a className="dropdown-item" href="#">Action 2</a></li>
            <li><a className="dropdown-item" href="#">Something else</a></li>
          </ul>
        </div>
        <input
          type="search"
          className="form-control form-control-dark text-bg-dark"
          placeholder="Ask New Question"
          aria-label="Search"
          style={{ maxWidth: "40%" }}
        />
        <button className="btn btn-primary">Search</button>
      </div>
    </div>
  );
}

export default Searchbar;



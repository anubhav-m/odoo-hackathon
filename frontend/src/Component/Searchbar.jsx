import React from "react";

function Searchbar() {
  return (
    <div className="container-fluid mt-3"> 
      <div className="d-flex flex-wrap align-items-center gap-3 w-100 justify-content-center">

       
        <div className="flex-grow-1 d-flex justify-content-center" style={{ maxWidth: "30%" }}>
          <button
            className="btn btn-primary text-nowrap w-100"
            style={{ fontSize: "16px" }}
          >
            Ask New Question
          </button>
        </div>
        <div className="input-group flex-grow-1" style={{ maxWidth: "30%" }}>
          <input
            type="search"
            className="form-control form-control-dark text-bg-dark"
            placeholder="Newest Unanswered"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-light dropdown-toggle text-nowrap"
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
        <div className="input-group flex-grow-1" style={{ maxWidth: "30%" }}>
          <input
            type="search"
            className="form-control form-control-dark text-bg-dark"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-primary text-nowrap">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;



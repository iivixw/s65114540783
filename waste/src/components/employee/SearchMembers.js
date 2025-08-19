import React, { useState } from "react";
import axios from "axios";
import "./SearchMembers.css";
import SidebarEmployee from "./SidebarEmployee";


const SearchMembers = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search?query=${query}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="search-members-layout">
      <SidebarEmployee />

      <div className="search-members-page">
        <div className="search-members-container">
          <h1 className="search-members-title">ค้นหาสมาชิก</h1>
          <form className="search-members-form">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาสมาชิก..."
              className="search-members-input"
            />
            <button
              type="button"
              onClick={handleSearch}
              className="search-members-button"
            >
              ค้นหา
            </button>
          </form>

          <div className="search-members-results">
            {results.length > 0 ? (
              <ul>
                {results.map((member) => (
                  <li key={member.employee_number}>
                    <strong>{member.name}</strong> - {member.employee_number}
                  </li>
                ))}
              </ul>
            ) : (
              <p>ไม่พบข้อมูล</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMembers;

import React, { useState } from "react";

const SearchUser = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Search:", query);

    // later connect API
  };

  return (
    <div className="w-full max-w-sm bg-gray-800 p-5 rounded-xl shadow-lg space-y-3">

      <h3 className="text-lg font-semibold text-center">
        🔍 Search User
      </h3>

      <input
        type="text"
        placeholder="Enter ID / Email / Phone"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white outline-none"
      />

      <button
        onClick={handleSearch}
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
      >
        Search
      </button>

    </div>
  );
};

export default SearchUser;
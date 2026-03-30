import React from "react";

const Sidebar = ({ setLayout, layout }) => {
  return (
    <aside className="bg-gray-100 p-4 w-64 h-full">
      <h2 className="text-xl font-bold mb-4">View Layout</h2>
      <button
        onClick={() => setLayout("grid")}
        className={`block w-full mb-2 p-2 rounded ${layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        Grid
      </button>
      <button
        onClick={() => setLayout("list")}
        className={`block w-full p-2 rounded ${layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
      >
        List
      </button>
    </aside>
  );
};

export default Sidebar;

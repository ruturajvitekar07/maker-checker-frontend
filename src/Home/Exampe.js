import React, { useState } from "react";

const Example = () => {
  const [role, setRole] = useState("developer");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const FileUploadPage = () => (
    <div>
      <h2>File Upload Page</h2>
      <p>Welcome, developer!</p>
      <h5 style={{ color: 'red' }}>No Bullet</h5>
          <ol style={{ listStyle: 'none' }}>
            <li>Apple</li>
            <li>Orange</li>
            <li>Guava</li>
          </ol>
    </div>
  );

  const FileApprovalPage = () => (
    <div>
      <h2>File Approval Page</h2>
      <p>Welcome, {role}!</p>
      <h5 style={{ color: 'red' }}>List-Lower-Latin</h5>
          <ol style={{ listStyleType: 'lower-latin' }}>
            <li>Water-melon</li>
            <li>Litchi</li>
            <li>Kiwi</li>
          </ol>
    </div>
  );

  const RenderPage = () => {
    switch (role) {
      case "developer":
        return <FileUploadPage />;
      case "associate":
      case "manager":
      case "teamlead":
        return <FileApprovalPage />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Dynamic Page Based on Role</h1>
      <select value={role} onChange={handleRoleChange}>
        <option value="developer">Developer</option>
        <option value="associate">Associate</option>
        <option value="manager">Manager</option>
        <option value="teamlead">Team Lead</option>
      </select>
      <RenderPage />
    </div>
  );
};

export default Example;

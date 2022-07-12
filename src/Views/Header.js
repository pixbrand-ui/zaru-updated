
import React from "react";
import { Link } from "react-router-dom";

export default function HeaderPage() {
  return (
    <>
      <ul>
        <li><Link to="/">Home</Link> </li>
        <li><Link to="/admin">Admin</Link> </li>
      </ul>
    </>
  );
}

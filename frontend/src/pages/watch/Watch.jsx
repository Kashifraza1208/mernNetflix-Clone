import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowBackOutlined } from "@material-ui/icons";

export default function Watch() {
  const location = useLocation();
  // console.log(location);
  const movie = location.state?.movie;

  return (
    <div className="watch">
      <Link to="/" className="link">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>

      {movie ? (
        <video className="video" autoPlay controls src={movie.video} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

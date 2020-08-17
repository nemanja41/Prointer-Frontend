import React from "react";
import { NodeMinus } from "react-bootstrap-icons";
import { useAppContext } from "../libs/contextLib";

const Coord = ({ long, lat, onClick }) => {
  const { isAuthenticated } = useAppContext();

  return (
    <div className="coord">
      [<span className="long">{long}</span> ;<span className="lat">{lat}</span>]
      {isAuthenticated && (
        <span className="minus">
          {" "}
          <NodeMinus onClick={onClick} />
        </span>
      )}
    </div>
  );
};

export default Coord;

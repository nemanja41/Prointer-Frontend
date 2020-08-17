import React, { useState, useEffect } from "react";

import { useLocation, useHistory } from "react-router-dom";
import "./User.css";
import { apiGetRequest, apiDeleteRequest } from "../libs/api";

export default function User() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const history = useHistory();

  const location = useLocation();
  useEffect(() => {
    const fetchUser = async () => {
      const id = location.pathname.split("/")[2];
      const data = await apiGetRequest("/user/" + id);

      if (data.user === undefined) {
        setError("Korisnik ne postoji");
        return;
      }
      setUser(data.user);
    };

    fetchUser();
  }, [location]);

  const deleteUser = async (id) => {
    const data = await apiDeleteRequest("/user/" + id);

    if (data.message === "Korisnik obrisan") {
      history.push("/");
    }
  };

  if (error) return <div>Nastala je greska: {error}</div>;

  return (
    <div className="User">
      {user.firstName === undefined ? (
        <div> Koristnik {location.pathname} se ucitava Koristnik </div>
      ) : (
        <div>
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
          <div>{user.email}</div>
          <div>{user.phoneNumber}</div>

          <button className="delete" onClick={() => deleteUser(user.id)}>
            Obrisi korisnika
          </button>
        </div>
      )}
    </div>
  );
}

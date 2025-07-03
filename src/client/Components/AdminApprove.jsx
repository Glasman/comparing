import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminApprove({ is_admin }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!is_admin) {
      navigate('/')
    }
  }, [is_admin, navigate])

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data: foundItems } = await axios.get("/api/items/unapproved");
        setItems(foundItems);
      } catch (error) {
        console.error(error);
      }
    };
    getItems();
  }, []);

  return (
    <div>
      <h2>Unapproved items</h2>
      {is_admin ? (
        items.map((item) => (
          <div
            key={item.id}
            style={{ border: "2px solid black", width: "500px" }}
          >
            <Link to={`/item/${item.id}`}>
              <h2>{item.name}</h2>
              <img src={item.image_url} />
            </Link>
          </div>
        ))
      ) : (
        <h1>You should not be here</h1>
      )}
    </div>
  );
}

export default AdminApprove;

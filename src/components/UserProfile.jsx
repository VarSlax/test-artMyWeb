import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UserField from "./UserField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [active, setActive] = useState(true);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  const userFields = [
    { label: "User ID", name: "id", disabled: true },
    { label: "Username", name: "name", disabled: active },
    { label: "User Email", name: "email", disabled: active },
    { label: "User Gender(male/female)", name: "gender", disabled: active },
    { label: "User Status(active/inactive)", name: "status", disabled: active },
  ];

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v1/users/${id}`,
        {
          headers: {
            Authorization:
              "Bearer 4507ec091617189feb007c42f949e980d400b1772751df25de40f18ef7c77e25",
          },
        }
      );
      setUser({
        id: response.data.data.id ?? "",
        name: response.data.data.name ?? "",
        email: response.data.data.email ?? "",
        gender: response.data.data.gender ?? "",
        status: response.data.data.status ?? "",
      });
    } catch (e) {
      console.error("Ошибка при загрузке пользователя", e);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`https://gorest.co.in/public/v1/users/${id}`, user, {
        headers: {
          Authorization:
            "Bearer 4507ec091617189feb007c42f949e980d400b1772751df25de40f18ef7c77e25",
        },
      });
      toast.success("Пользователь успешно обновлен");
      navigate("/users");
    } catch (error) {
      toast.error("Ошибка при обновлении пользователя");
      console.error("Ошибка при обновлении пользователя", error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box sx={{ mt: 1 }}>
      <Card sx={{ background: "lightblue", m: "auto", width: "40%" }}>
        <CardContent>
          {userFields.map((field) => (
            <UserField
              key={field.name}
              label={field.label}
              name={field.name}
              value={user[field.name]}
              disabled={field.disabled}
              onChange={handleInputChange}
            />
          ))}
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/users")}
            size="small"
          >
            Back
          </Button>
          {active ? (
            <EditIcon
              onClick={() => setActive((prev) => !prev)}
              sx={{ cursor: "pointer" }}
            />
          ) : (
            <SaveIcon
              onClick={() => setActive((prev) => !prev)}
              sx={{ cursor: "pointer" }}
            />
          )}
          <Button onClick={handleSubmit} variant="outlined" size="small">
            Update
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserProfile;

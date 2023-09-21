import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
    name: "",
    email: "",
    gender: "",
    status: "",
  });

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
      setUser(response?.data.data);
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
  }, [id]);

  return (
    <Box sx={{ mt: 1 }}>
      <Card sx={{ background: "lightblue", m: "auto", width: "40%" }}>
        <CardContent>
          <Box
            sx={{
              mb: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            User ID
            <TextField
              value={user.id}
              onChange={handleInputChange}
              disabled={active}
              label={id}
              defaultValue={id}
            />
          </Box>
          <Box
            sx={{
              mb: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            Username
            <TextField
              label="Имя"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </Box>
          <Box
            sx={{
              mb: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            User Email
            <TextField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </Box>
          <Box
            sx={{
              mb: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            User gender
            <TextField
              label="Гендер"
              name="gender"
              value={user.gender}
              onChange={handleInputChange}
            />
          </Box>
          <Box
            sx={{
              mb: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            User status
            <TextField
              label="Статус"
              name="status"
              value={user.status}
              onChange={handleInputChange}
            />
          </Box>
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

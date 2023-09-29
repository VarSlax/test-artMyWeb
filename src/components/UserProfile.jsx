import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardActions, CardContent, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import { useData } from "./DataContext";
import UserField from "./UserField";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userCardData, setUserCardData, fetchUserById, updateUser } =
    useData();

  const [active, setActive] = useState(true);

  const userFields = [
    { label: "User ID", name: "id", disabled: true },
    { label: "Username", name: "name", disabled: active },
    { label: "User Email", name: "email", disabled: active },
    { label: "User Gender(male/female)", name: "gender", disabled: active },
    { label: "User Status(active/inactive)", name: "status", disabled: active },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCardData({ ...userCardData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await updateUser(id, userCardData);
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    fetchUserById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ mt: 1 }}>
      <Card sx={{ background: "lightblue", m: "auto", width: "40%" }}>
        <CardContent>
          {userFields.map((field) => (
            <UserField
              key={field.name}
              label={field.label}
              name={field.name}
              value={userCardData[field.name]}
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
              onClick={() => setActive(false)}
              sx={{ cursor: "pointer" }}
            />
          ) : (
            <SaveIcon
              onClick={() => setActive(true)}
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

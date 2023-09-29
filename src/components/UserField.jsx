import React from "react";
import { TextField, Box } from "@mui/material";

const UserField = ({ label, name, value, disabled, onChange }) => {
  return (
    <Box
      sx={{
        mb: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {label}
      <TextField
        name={name}
        value={value || ""}
        disabled={disabled}
        onChange={onChange}
        variant="outlined"
      />
    </Box>
  );
};

export default UserField;

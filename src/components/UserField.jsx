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
        label={label}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </Box>
  );
};

export default UserField;

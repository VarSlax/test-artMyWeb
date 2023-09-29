import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useData } from "./DataContext.jsx";
import { useEffect } from "react";

const UsersTable = () => {
  const { fetchUsersDataByPage, tableDataForSinglePage, pagination } = useData();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [gender, setGender] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  useEffect(() => {
    fetchUsersDataByPage(currentPage, gender)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, gender]) 

  return (
    <Box sx={{ m: 1 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-gender">Gender</InputLabel>
        <Select
          labelId="select-gender"
          id="select-gender"
          value={gender}
          label="Gender"
          onChange={handleChangeGender}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>
      <Paper sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableDataForSinglePage
                .map((user) => (
                  <TableRow hover key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <Link to={`/user/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={pagination?.pages || 0}
          rowsPerPage={rowsPerPage}
          page={currentPage - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default UsersTable;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import {
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

const UsersTable = () => {
  const [usersData, setUsersData] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [gender, setGender] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const filterUsersByGender = () => {
    if (!usersData[currentPage]) {
      return [];
    }

    if (gender === "female") {
      return usersData[currentPage].filter((el) => el.gender === "female");
    }

    if (gender === "male") {
      return usersData[currentPage].filter((el) => el.gender === "male");
    }

    return usersData[currentPage];
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v1/users?page=${currentPage}`,
        {
          headers: {
            Authorization:
              "Bearer 4507ec091617189feb007c42f949e980d400b1772751df25de40f18ef7c77e25",
          },
        }
      );

      const responseData = response?.data.data;
      const paginationData = response?.data.meta.pagination;

      setUsersData((prevData) => ({
        ...prevData,
        [currentPage]: responseData,
      }));
      setTotalPages(paginationData.pages);
    } catch (error) {
      console.error("Ошибка при загрузке данных", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, gender]);

  return (
    <Box sx={{ m: 1 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-gender">Gender</InputLabel>
        <Select
          labelId="select-gender"
          id="select-gender"
          value={gender}
          label="gender"
          onChange={handleChangeGender}
        >
          <MenuItem value="all">all</MenuItem>
          <MenuItem value="male">male</MenuItem>
          <MenuItem value="female">female</MenuItem>
        </Select>
      </FormControl>
      <Paper sx={{ width: "100%" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterUsersByGender().map((user) => (
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
          count={totalPages}
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

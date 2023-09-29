// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";

// import config from "../config";

// const UsersTable = () => {
//   const { apiUrl, authToken } = config;
//   const [usersData, setUsersData] = useState({});
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [gender, setGender] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage + 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(1);
//   };

//   const handleChangeGender = (event) => {
//     setGender(event.target.value);
//   };

//   const filterUsersByGender = () => {
//     if (!usersData[currentPage]) {
//       return [];
//     }

//     if (gender === "female") {
//       return usersData[currentPage].filter((el) => el.gender === "female");
//     }

//     if (gender === "male") {
//       return usersData[currentPage].filter((el) => el.gender === "male");
//     }

//     return usersData[currentPage];
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}?page=${currentPage}`, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });

//       const responseData = response?.data.data;
//       const paginationData = response?.data.meta.pagination;

//       setUsersData((prevData) => ({
//         ...prevData,
//         [currentPage]: responseData,
//       }));
//       setTotalPages(paginationData.pages);
//     } catch (error) {
//       console.error("Data fetching error", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentPage, gender]);

//   return (
//     <Box sx={{ m: 1 }}>
//       <FormControl sx={{ m: 1, minWidth: 120 }}>
//         <InputLabel id="select-gender">Gender</InputLabel>
//         <Select
//           labelId="select-gender"
//           id="select-gender"
//           value={gender}
//           label="gender"
//           onChange={handleChangeGender}
//         >
//           <MenuItem value="all">all</MenuItem>
//           <MenuItem value="male">male</MenuItem>
//           <MenuItem value="female">female</MenuItem>
//         </Select>
//       </FormControl>
//       <Paper sx={{ width: "100%" }}>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Id</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Gender</TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filterUsersByGender().map((user) => (
//                 <TableRow hover key={user.id}>
//                   <TableCell>{user.id}</TableCell>
//                   <TableCell>
//                     <Link to={`/user/${user.id}`}>{user.name}</Link>
//                   </TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.gender}</TableCell>
//                   <TableCell>{user.status}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10]}
//           component="div"
//           count={totalPages}
//           rowsPerPage={rowsPerPage}
//           page={currentPage - 1}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Box>
//   );
// };

// export default UsersTable;

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
import { useData } from "../utils/DataContext.js";

const UsersTable = () => {
  const { userData, pagination } = useData();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [gender, setGender] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  // const filterUsersByGender = () => {
  //   let filteredUsers = userData;

  //   if (gender === "female") {
  //     filteredUsers = filteredUsers.filter((user) => user.gender === "female");
  //   } else if (gender === "male") {
  //     filteredUsers = filteredUsers.filter((user) => user.gender === "male");
  //   }

  //   return filteredUsers;
  // };

  // console.log(userData);

  console.log(userData);
  console.log(pagination);

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
              {userData
                .slice(
                  currentPage * rowsPerPage,
                  currentPage * rowsPerPage + rowsPerPage
                )
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
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={pagination.pages}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default UsersTable;

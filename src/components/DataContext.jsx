import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;
  const authToken = process.env.REACT_APP_AUTH_TOKEN;

  const [tableDataForSinglePage, setTableDataForSinglePage] = useState([]);
  const [userCardData, setUserCardData] = useState({});
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUsersDataByPage = async (pageNumber, gender) => {
    try {
      const response = await axios.get(
        `${apiUrl}?page=${pageNumber}&gender=${gender}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const responseData = response.data;
      setTableDataForSinglePage(responseData?.data);
      setPagination(responseData?.meta.pagination);
      setLoading(false);
    } catch (error) {
      console.error("Data fetching error", error);
      setLoading(false);
    }
  };

  const fetchUserById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUserCardData({
        id: response.data.data.id ?? "",
        name: response.data.data.name ?? "",
        email: response.data.data.email ?? "",
        gender: response.data.data.gender ?? "",
        status: response.data.data.status ?? "",
      });
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error("Fetch user by ID error", error);
      setLoading(false);
      return null;
    }
  };

  const updateUser = async (id) => {
    try {
      const response = await axios.put(`${apiUrl}/${id}`, userCardData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUserCardData({
        id: response.data.data.id ?? "",
        name: response.data.data.name ?? "",
        email: response.data.data.email ?? "",
        gender: response.data.data.gender ?? "",
        status: response.data.data.status ?? "",
      });
      setLoading(false);
      toast.success("User updated successfully");
      navigate("/users");
    } catch (error) {
      toast.error("Updating user error");
      console.error("Updating user error", error);
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        userCardData,
        setUserCardData,
        pagination,
        fetchUserById,
        tableDataForSinglePage,
        fetchUsersDataByPage,
        updateUser,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

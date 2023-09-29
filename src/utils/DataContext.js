/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();

  const { apiUrl, authToken } = config;
  const [userData, setUserData] = useState([]);
  const [userCardData, setUserCardData] = useState({});
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const responseData = response?.data.data;
      const responsePagination = response?.data.meta.pagination;

      setPagination(responsePagination);
      setUserData((prevData) => ({
        ...prevData,
        [responsePagination.page]: responseData,
      }));

      // setUserData(response?.data.data ?? []);
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
    } catch (error) {
      console.error("Fetch user by ID error", error);
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
      toast.success("User updated successfully");
      navigate("/users");
    } catch (error) {
      toast.error("Updating user error");
      console.error("Updating user error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        userData,
        userCardData,
        setUserCardData,
        pagination,
        loading,
        fetchUserById,
        updateUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../services/api";
import useSWR from "swr";

export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const { data } = useSWR("/sessions", async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          newtoken: true,
        },
      });

      dispatch({
        type: "SET_USER_DATA",
        userData: response.data.user,
      });

      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.clear();
      }
    }
  });

  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") ? (
          <Component {...props} userData={data?.user} token={data?.token} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

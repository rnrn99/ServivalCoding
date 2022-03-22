import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Container, Row } from "react-bootstrap";
import { Container, Grid } from "@mui/material";

import * as Api from "../../api";
import UserNetworkCard from "./UserNetworkCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "users" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("users").then((res) => setUsers(res.data.data));
  }, [userState, navigate]);

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {users.map((user) => (
          <UserNetworkCard key={user.id} user={user} />
        ))}
      </Grid>
    </Container>
  );
}

export default Network;

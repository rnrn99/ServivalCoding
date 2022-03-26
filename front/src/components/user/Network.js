import React, { useEffect, useContext, useState, useRef } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Input,
  Box,
  InputAdornment,
  Typography,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import * as Api from "../../api";
import UserNetworkCard from "./UserNetworkCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const [users, setUsers] = useState([]); // 유저의 정보를 저장합니다.
  const [searchWord, setSearchWord] = useState(""); // 검색어를 저장합니다.
  const [isFound, setIsFound] = useState(true); // 검색 결과의 유무를 저장합니다.

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "users" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("users").then((res) => {
      setUsers(res.data.users);
    });
  }, [userState, navigate]);

  const sendQuery = async (word) => {
    try {
      if (word.length === 0) {
        const { data } = await Api.get("users");
        setUsers(data.users);
        setIsFound(true);
      } else {
        const { data } = await Api.get("users/search", word);
        if (data.users.length > 0) {
          setUsers(data.users);
          setIsFound(true);
        } else {
          setIsFound(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 200ms마다 사용자의 입력을 가져와 쿼리를 보냅니다.
  const delayedSearchWord = useRef(
    _.debounce((q) => sendQuery(q), 200),
  ).current;

  const inputChangeHandler = (e) => {
    setSearchWord(e.target.value);
    delayedSearchWord(e.target.value);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,
        }}
      >
        <Input
          variant="outlined"
          startAdornment={
            <InputAdornment position="start">
              <PersonSearchIcon />
            </InputAdornment>
          }
          value={searchWord}
          onChange={(e) => inputChangeHandler(e)}
          placeholder="이름, 기술 태그를 입력하세요"
          style={{ width: "30%" }}
        />
      </Box>
      <Grid container spacing={4}>
        {isFound ? (
          users.map((user) => <UserNetworkCard key={user.id} user={user} />)
        ) : (
          <Typography> 검색 결과 없음</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Network;

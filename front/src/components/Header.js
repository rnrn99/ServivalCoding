import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, Tab } from "@mui/material";
import { UserStateContext, DispatchContext } from "../App";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 로그인 화면으로 돌아감.
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1, boxShadow: 0, mb: 3 }}>
      <AppBar
        position="static"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          color: "#000",
        }}
      >
        <Toolbar>
          <img
            src="/logo.png"
            width="6%"
            alt="logo"
            style={{ display: "flex", justifyContent: "center" }}
          />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              fontFamily: "Red Hat Mono, monospace",
              color: '#C7A27C'
            }}
          >
            Survival Coding
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tab
              icon={<AccountCircleIcon />}
              label="MY PAGE"
              onClick={() => navigate("/")}
            />
            <Tab
              icon={<GroupIcon />}
              label="NETWORK"
              onClick={() => navigate("/network")}
            />
            {isLogin && (
              <Tab icon={<LogoutIcon />} label="LOGOUT" onClick={logout} />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

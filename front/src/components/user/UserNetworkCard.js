import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Grid,
  Button,
} from "@mui/material";
import { defaultImage, getImageBaseUrl } from "../../utils";

function UserNetworkCard({ user }) {
  const navigate = useNavigate();
  const imageBaseUrl = getImageBaseUrl(); // 이미지의 baseUrl을 저장합니다.

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          image={
            user &&
            (user.profile !== defaultImage
              ? imageBaseUrl + user.profile
              : user.profile)
          }
          height="262"
          onError={(e) => (e.target.src = "/logo.png")}
          alt={user.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {user.name}
          </Typography>
          <Typography>{user.description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
            sx={{ ml: 20 }}
          >
            Portfolio
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default UserNetworkCard;

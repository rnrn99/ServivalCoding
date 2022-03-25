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
import { defaultImage } from "../../utils";

function UserNetworkCard({ user }) {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          image={
            user &&
            (user.profile !== defaultImage
              ? process.env.REACT_APP_IMAGE_URL_DEV + user.profile
              : user.profile)
          }
          alt="random"
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

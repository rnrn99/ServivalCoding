import React, { useState, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function User({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState({});

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data.user));
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing && (
        <Dialog open={isEditing} onClose={() => setIsEditing((cur) => !cur)}>
          <DialogTitle>프로필 편집</DialogTitle>
          <DialogContent>
            <UserEditForm
              user={user}
              setIsEditing={setIsEditing}
              setUser={setUser}
            />
          </DialogContent>
        </Dialog>
      )}
      <UserCard
        user={user}
        setUser={setUser}
        portfolioOwnerId={portfolioOwnerId}
        setIsEditing={setIsEditing}
        isEditable={isEditable}
      />
    </>
  );
}

export default User;

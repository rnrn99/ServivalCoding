import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import HelpIcon from "@mui/icons-material/Help";
//QuestionPopover 컴포넌트를 임포트하고
//message만 연결하면 물음표 모양의 팝오버 버튼 사용가능
export default function QuestionPopover({ message }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="add to shopping cart"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        <HelpIcon color="primary" />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>{message}</Typography>
      </Popover>
    </div>
  );
}

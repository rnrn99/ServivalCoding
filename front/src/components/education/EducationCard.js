import React from "react";
import { Button, Grid } from "@mui/material";

function EducationCard({ education, setClickEditBtn, isEditable }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={10}>
        <p style={{ marginBottom: "5px" }}>{education.school}</p>
        <p className="text-muted">
          {education.major} ({education.position})
        </p>
      </Grid>
      <Grid item xs={2}>
        {isEditable && (
          <Button
            variant="outlined"
            size="small"
            sx={{
              float: "right",
              margin: "10px 15px 0 0",
              borderColor: "#0dcaf0",
              color: "#0dcaf0",
            }}
            onClick={() => setClickEditBtn((cur) => !cur)}
          >
            편집
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default EducationCard;

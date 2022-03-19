import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProductEditForm";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function Project({ project, setProjects, isEditable }) {
  const [clickEditBtn, setClickEditBtn] = useState(false); // 편집 버튼 클릭 상태를 저장합니다.
  return (
    <>
      <Dialog
        open={clickEditBtn}
        onClose={() => setClickEditBtn((cur) => !cur)}
      >
        <DialogTitle>학력 편집</DialogTitle>
        <DialogContent>
          <ProjectEditForm
            project={project}
            setProjects={setProjects}
            setClickEditBtn={setClickEditBtn}
          />
        </DialogContent>
      </Dialog>

      <ProjectCard
        project={project}
        setClickEditBtn={setClickEditBtn}
        isEditable={isEditable}
        setProjects={setProjects}
      />
    </>
  );
}

export default Project;

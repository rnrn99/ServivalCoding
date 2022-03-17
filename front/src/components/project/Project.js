import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectEditForm from "./ProductEditForm";

function Project({ project, setProjects, isEditable }) {
  const [clickEditBtn, setClickEditBtn] = useState(false); // 편집 버튼 클릭 상태를 저장합니다.
  return (
    <>
      {clickEditBtn ? (
        <ProjectEditForm
          project={project}
          setProjects={setProjects}
          setClickEditBtn={setClickEditBtn}
        />
      ) : (
        <ProjectCard
          project={project}
          setClickEditBtn={setClickEditBtn}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Project;

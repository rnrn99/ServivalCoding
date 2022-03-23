//기술 명에 따른 아이콘 url 파싱
const techNameToURL = (techName) => {
  //소문자 변환
  //공백제거.
  //objective-c >> objectivec
  //csharp 예외처리
  //c# > csharp

  let newName = techName.toLowerCase().replace(/(\s*)/g, "");

  if (newName === "c#" || newName === "csharp") {
    newName = "csharp";
  } else if (newName === "visualstudiocode" || newName === "visualstudio") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg";
  } else if (newName === "objective-c") {
    return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg";
  }

  const urlStr = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${newName}/${newName}-original.svg`;

  return urlStr;
};

export default techNameToURL;

//기술 명에 따른 아이콘 url 파싱
const techNameToURL = (techName) => {
  if (!techName) return "";
  else {
    let newName = techName.toLowerCase().replace(/(\s*)/g, "");

    if (newName === "c#" || newName === "csharp") {
      newName = "csharp";
    } else if (newName === "c++") {
      newName = "cplusplus";
    } else if (newName === "js") {
      newName = "javascript";
    } else if (newName === "mui") {
      newName = "materialui";
    } else if (newName === "aws") {
      newName = "amazonwebservices";
    } else if (newName === "visualstudiocode" || newName === "visualstudio") {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg";
    } else if (newName === "objective-c") {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg";
    }

    const urlStr = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${newName}/${newName}-original.svg`;

    return urlStr;
  }
};

export default techNameToURL;

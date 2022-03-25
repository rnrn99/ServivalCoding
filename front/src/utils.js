import axios from "axios";

// Date를 YYYY-MM-DD의 문자열로 바꾸는 함수입니다.
export const dateToString = (date) => {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
};

// 학교 정보를 가져오기 위해 open api로 요청을 보낼 api를 만드는 함수입니다.
export function getEducationApi(word) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const target = process.env.REACT_APP_TARGET;
  return axios.create({
    baseURL: "http://www.career.go.kr/cnet/openapi/getOpenApi",
    params: {
      apiKey,
      svcType: "api",
      svcCode: "SCHOOL",
      contentType: "json",
      gubun: target,
      perPage: "3",
      searchSchulNm: word,
    },
  });
}

export function sendFile(formData) {
  const backendPortNumber = "5001";
  const serverUrl =
    "http://" + window.location.hostname + ":" + backendPortNumber + "/";
  return axios.post(serverUrl + "profiles", formData, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      "content-type": "multipart/form-data",
    },
  });
}

export const defaultImage = "http://placekitten.com/200/200";

export const getImageBaseUrl = () => {
  let imageBaseUrl = "";
  if (process.env.NODE_ENV === "development") {
    imageBaseUrl = process.env.REACT_APP_IMAGE_URL_DEV;
  } else {
    imageBaseUrl = process.env.REACT_APP_IMAGE_URL_PROD;
  }
  return imageBaseUrl;
};

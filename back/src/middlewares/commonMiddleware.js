import is from "@sindresorhus/is";
import { fieldChecking } from "../utils/utils.js";

function isBodyEmpty(req, res, next) {
  if (is.emptyObject(req.body)) {
    const error = new Error(
      "headers의 Content-Type을 application/json으로 설정해주세요"
    );
    error.status = 400;
    throw error;
  }
  next();
}

function getParameter(...args) {
  return (req, res, next) => {
    args.map((parameter) => {
      if (req.params[parameter]) req[parameter] = req.params[parameter];
    });
    next();
  };
}

function checkRequestBody(...args) {
  return (req, res, next) => {
    req.toPost = fieldChecking(req.body, ...args);
    next();
  };
}

export { isBodyEmpty, getParameter, checkRequestBody };

import { Router } from "express";
import { loginRequired } from "../middlewares/loginRequired.js";

import * as certificateMiddleware from "../middlewares/certificateMiddleware.js";
import * as commonMiddleware from "../middlewares/commonMiddleware.js";

const certificateRouter = Router();

certificateRouter.post(
  "/certificates",
  loginRequired,

  commonMiddleware.isBodyEmpty,
  commonMiddleware.checkRequestBody("title", "description", "date"),
  certificateMiddleware.addCertificate,
  commonMiddleware.makeResponseBody("certificate"),
  function (req, res, next) {
    res.status(201).json(req.body);
  }
);

certificateRouter.get(
  "/certificates/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  certificateMiddleware.getCertificate,
  commonMiddleware.makeResponseBody("certificate"),
  function (req, res, next) {
    res.status(200).json(req.body);
  }
);

certificateRouter.put(
  "/certificates/:id",
  loginRequired,

  commonMiddleware.getParameter("id"),
  certificateMiddleware.setCertificate,
  commonMiddleware.makeResponseBody("certificate"),
  function (req, res, next) {
    res.status(200).json(req.body);
  }
);

certificateRouter.get(
  "/certificate-lists/:userId",
  loginRequired,
  commonMiddleware.getParameter("userId"),
  certificateMiddleware.getCertificates,
  commonMiddleware.makeResponseBody("certificates"),
  function (req, res, next) {
    res.status(200).json(req.body);
  }
);

certificateRouter.delete(
  "/certificates/:id",
  loginRequired,
  commonMiddleware.getParameter("id"),
  certificateMiddleware.deleteCertificate,
  function (req, res, next) {
    res.status(200).json({ success: true, message: "삭제 성공" });
  }
);

export { certificateRouter };

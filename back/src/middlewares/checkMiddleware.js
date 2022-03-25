import { check, param, body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({
    success: false,
    error: {
      code: 400,
      message: errors.array()[0].msg,
      detail: errors.errors,
    },
  });
};

const paramsValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(404).json({
    success: false,
    error: {
      code: 404,
      message: errors.array()[0].msg,
      detail: errors.errors,
    },
  });
};

const checkId = [
  param("id")
    .exists()
    .notEmpty()
    .isLength({ min: 36 })
    .withMessage("올바른 id 값을 입력해주세요")
    .trim(),
  paramsValidate,
];

const checkAwardCreated = [
  body("title")
    .exists()
    .withMessage("제목은 필수로 1 글자 이상 입력해야 합니다!")
    .bail()
    .isLength({ min: 1 })
    .withMessage("제목은 필수로 1 글자 이상 입력해야 합니다!"),
  validate,
];

function checkUpdate(req, res, next) {
  const check = Object.keys(req.body);
  if (check.length === 0) {
    return res.status(400).json({
      success: false,
      error: { code: 400, message: "수정 내용이 비어있습니다." },
    });
  }
  next();
}

const checkUserId = [
  param("userId")
    .exists()
    .trim()
    .isLength({ min: 36 })
    .withMessage("올바른 userId 값을 입력해주세요!"),
  paramsValidate,
];

const checkCareerCreated = [
  body("title")
    .exists()
    .isLength({ min: 1 })
    .withMessage("제목은 필수로 1 글자 이상 입력해야 합니다!")
    .bail(),
  body("fromDate")
    .exists()
    .isLength({ min: 1 })
    .withMessage("시작일은 필수로 입력해야 합니다.")
    .bail(),
  body("toDate")
    .exists()
    .isLength({ min: 1 })
    .withMessage("종료일은 필수로 입력해야 합니다."),
  validate,
];
const checkEducationCreated = [
  body("school")
    .exists()
    .withMessage("학교는 필수로 1글자 이상 입력해야합니다.")
    .bail()
    .isLength({ min: 1 })
    .withMessage("학교는 필수로 1글자 이상 입력해야합니다."),
  validate,
];

function checkCertificateCreated(req, res, next) {
  const fields = ["title", "description", "date"];
  const body = Object.keys(req.body);
  const check = fields.filter((field) => !body.includes(field));
  if (check.length) {
    return res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: `${check.join(", ")} 은(는) 필수로 입력해줘야 합니다.`,
      },
    });
  }
  next();
}

function checkProjectCreated(req, res, next) {
  const fields = ["title", "description", "from", "to"];
  const body = Object.keys(req.body);
  const check = fields.filter((field) => !body.includes(field));
  if (check.length) {
    return res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: `${check.join(", ")} 은(는) 필수로 입력해줘야 합니다.`,
      },
    });
  }
  next();
}
const checkUserCreated = [
  body("name")
    .exists()
    .withMessage("이름을 입력해주세요.")
    .bail()
    .isLength({ min: 1 })
    .withMessage("이름은 필수로 1 글자 이상 입력해야 합니다!")
    .bail(),
  body("email")
    .exists()
    .withMessage("이메일을 입력해주세요.")
    .bail()
    .isEmail()
    .withMessage("올바른 이메일을 입력해주세요.")
    .bail(),
  body("password")
    .exists()
    .withMessage("비밀번호를 입력해주세요.")
    .bail()
    .isLength({ min: 4 })
    .withMessage("비밀번호는 4글자 이상이어야 합니다."),
  validate,
];

const checkUserLogin = [
  body("email")
    .exists()
    .withMessage("이메일을 입력해주세요.")
    .bail()
    .isEmail()
    .withMessage("올바른 이메일을 입력해주세요.")
    .bail(),
  body("password").exists().withMessage("비밀번호를 입력해주세요.").bail(),
  validate,
];

export {
  checkAwardCreated,
  checkId,
  checkUpdate,
  checkUserId,
  checkCareerCreated,
  checkCertificateCreated,
  checkEducationCreated,
  checkProjectCreated,
  checkUserCreated,
  checkUserLogin,
  validate,
  paramsValidate,
};

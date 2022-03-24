function checkAwardCreated(req, res, next) {
  const check = Object.keys(req.body).includes("title");
  if (check) {
    return next();
  }
  return res.status(400).json({
    success: false,
    error: { code: 400, message: "title 은 필수로 입력해야합니다." },
  });
}

function checkId(req, res, next) {
  const check = req.params.id.length;
  if (check === 36) {
    return next();
  }
  return res.status(400).json({
    success: false,
    error: { code: 400, message: "올바른 id 값이 아닙니다." },
  });
}

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

function checkUserId(req, res, next) {
  const check = req.params.userId.length;
  if (check === 36) {
    return next();
  }
  return res.status(400).json({
    success: false,
    error: { code: 400, message: "올바른 id 값이 아닙니다." },
  });
}

function checkCareerCreated(req, res, next) {
  const fields = ["title", "fromDate", "toDate"];
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

function checkEducationCreated(req, res, next) {
  const check = Object.keys(req.body).includes("school");
  if (check) {
    return next();
  }
  return res.status(400).json({
    success: false,
    error: { code: 400, message: "school 은 필수로 입력해야합니다." },
  });
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

export {
  checkAwardCreated,
  checkId,
  checkUpdate,
  checkUserId,
  checkCareerCreated,
  checkCertificateCreated,
  checkEducationCreated,
  checkProjectCreated,
};

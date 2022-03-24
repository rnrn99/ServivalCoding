function errorMiddleware(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  console.log("\x1b[33m%s\x1b[0m", error);

  const body = {
    success: false,
    error: {
      code: error.status,
      message: error.message
    }
  };
  res
    .status(error.status)
    .send(body);
}

export { errorMiddleware };

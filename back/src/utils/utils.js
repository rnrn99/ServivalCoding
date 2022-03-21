function updateHandler(toUpdate) {
  return Object
    .entries(toUpdate)
    .filter(([key, value]) => isTruthy(value))
    .reduce((result, [key, value]) => {
      result[key] = value;
      return result;
    }, {});
}

function isTruthy(data) {
  return !(data === null
    || data === undefined
    || data === false
    || data === ""
    || data === 0);
}

export { updateHandler, isTruthy }
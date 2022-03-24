function updateHandler(toUpdate) {
  return Object
    .entries(toUpdate)
    .filter(([key, value]) => isEmpty(value))
    .reduce((result, [key, value]) => {
      result[key] = value;
      return result;
    }, {});
}

function isEmpty(data) {
  if (data instanceof Array) {
    return data.length === 0
  }

  return !!data;
}

function fieldChecking(body, ...args) {
  return args
    .reduce((res, acc) => {
      res[acc] = isEmpty(body[acc]) ? body[acc] : null;
      return res;
    }, {});
}

function removeFields(document, ...args) {
  return Object
    .entries(document)
    .filter(([key, value]) => !args.includes(key))
    .reduce((res, [key, value]) => {
      res[key] = value;
      return res;
    }, {});
}

export { updateHandler, isEmpty, fieldChecking, removeFields }
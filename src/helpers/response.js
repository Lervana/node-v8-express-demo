const RESPONSE_STATE = {
  FAIL: 'FAIL',
  SUCCESS: 'SUCCESS',
};

const createResponse = (status, code, data, errors) => {
  const response = {};

  if (status) response.status = status;
  if (code) response.custom_code = code;
  if (data) response.data = data;
  if (errors) response.errors = errors;

  return response;
};

exports.RESPONSE_STATE = RESPONSE_STATE;
exports.createResponse = createResponse;
exports.errorResponse = (code = 500, errors) => createResponse(RESPONSE_STATE.FAIL, code, null, errors);
exports.successResponse = (data, code = 200) => createResponse(RESPONSE_STATE.SUCCESS, code, data);

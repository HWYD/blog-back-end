// import {deepCopy} from '../utils/index'

export default function responseFormatter(req, res, next) {
  // 保存原始的res.json方法
  const originalJson = res.json
  // 重写res.json方法
  res.json = function (data) {
    // if(typeof data == 'object' && data !== null){
    //     data.login_status = !!(req.user?.id)
    // }
    const response = {
      code: 200,
      message: 'Success',
      data
    }
    if (data === null) {
      response.message = 'Data not found'
    }
    // 如果有错误，根据错误类型设置code和message
    if (data instanceof Error) {
      response.code = 500
      response.message = data.message
      data = null
    }
    // 调用原始的res.json方法发送统一格式的响应
    return originalJson.call(res, response)
  }
  // 保存原始的res.send方法
  // const originalSend = res.send;
  // // 重写res.send方法
  // res.send = function (data) {
  //     const response = {
  //         code: 200,
  //         message: 'Success',
  //         data: data
  //     };
  //     if (data === null) {
  //         response.message = 'Data not found';
  //     }
  //     // 如果有错误，根据错误类型设置code和message
  //     if (data instanceof Error) {
  //         response.code = 500;
  //         response.message = data.message;
  //         data = null;
  //     }
  //     // 调用原始的res.send方法发送统一格式的响应
  //     return originalSend.call(res, response);
  // };
  next()
}

function getMessageForStatusCode(statusCode) {
  switch (statusCode) {
    case 200:
      return 'Success'
    case 400:
      return 'Bad request'
    case 401:
      return 'Unauthorized'
    case 403:
      return 'Forbidden'
    case 404:
      return 'Not found'
    case 500:
      return 'Internal server error'
    default:
      return 'Unknown status code'
  }
}

// // 保存原始的res.sendStatus方法
// const originalSendStatus = res.sendStatus;
// // 重写res.sendStatus方法
// res.sendStatus = function (statusCode) {
//     const response = {
//         code: statusCode,
//         message: getMessageForStatusCode(statusCode),
//         data: null
//     };
//     // 调用原始的res.sendStatus方法发送统一格式的响应
//     return originalSendStatus.call(res, response);
// };

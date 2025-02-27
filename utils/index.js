import jwt from 'jsonwebtoken'

const secretKey = 'secret_key_1230';

const whiteList = [
  '/login',
  '/register',
  '/book',
  'hello'
];

//生成token
export function generateToken(userInfo) {
    // const payload = {
    //     userId: user.userId,
    //     username: user.username,
    //     // 可以添加更多需要包含在token中的用户信息
    // };
    const options = {
        expiresIn: '120h' // token的有效期，这里设置为1小时
    };
    const token = jwt.sign(userInfo, secretKey, options);
    console.log('token',token)
    return token
  }


//校验token
export function authenticateToken(req, res, next) {
  const token = req.cookies.authorization || req.headers.authorization
  console.log('有无token呢',token,req.headers)
  if (token == null) {
      // return res.sendStatus(401);
      next();
      return
  }
  jwt.verify(token, secretKey, (err, user) => {
      if (err) {
          // console.log('err 403')
          // return res.sendStatus(403);
          next();
          return
      }
      console.log('校验通过')
      req.user = user;
      // 检查token是否接近过期，如果接近过期则生成一个新的token并返回给客户端
      const currentTime = Math.floor(Date.now() / 1000);
      if (user.exp && user.exp - currentTime < 60) {
          const newToken = generateToken(user);
          console.log('新token',newToken)
          // res.set('Authorization', 'Bearer ' + newToken);
      }
      next();
  });
}


  //深拷贝
export function deepCopy(obj) {
    // 如果不是对象或者为 null，直接返回原对象。这也处理了所有的原始数据类型。
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    // 初始化一个数组或对象，准备用作返回值。
    let copy;
    if (Array.isArray(obj)) {
      copy = [];
    } else {
      copy = {};
    }
  
    // 递归复制每个属性。
    for (const key in obj) {
      // 确保属性属于对象本身，而不是其原型链上的。
      if (obj.hasOwnProperty(key)) {
        // 如果属性值是对象，递归调用深拷贝；否则，直接复制属性值。
        copy[key] = deepCopy(obj[key]);
      }
    }
  
    return copy;
  }


  // 统一返回格式
export function resFormatter(data,errMsg){
  const response = {
    code: 200,
    message: 'Success',
    data: data
  };
  if (data === null) {
      response.message = 'Data not found';
  }
  // 如果有错误，根据错误类型设置code和message
  if (data instanceof Error) {
      response.code = 500;
      response.message = errMsg || data.message;
      response.data = null;
  }
  return response
}
import User from '../models/user.js'

// 创建记录
async function createUser(userInfo) {
  const user = await User.create(userInfo)
  return user.toJSON()
}

// 查询所有记录
async function findAllUsers(offset, limit) {
  const users = await User.findAll({
    offset,
    limit,
    order: [['create_time', 'DESC']]
  })
  return users.map(user => user.toJSON())
}

// 根据 id 查询记录
async function findUserById(id) {
  const user = await User.findByPk(id)
  return user?.toJSON()
}
// 根据 phone 查询记录
async function findUserByPhone(phone) {
  const user = await User.findOne({
    where: {
      phone
    }
  })
  return user?.toJSON()
}

// 更新记录
async function updateUser(userInfo) {
  const user = await User.findByPk(userInfo.id)
  if (user) {
    user.name = userInfo.name || user.name
    user.age = userInfo.age || user.age
    user.phone = userInfo.phone || user.phone
    user.email = userInfo.email || user.email
    await user.save()
  } else {
    console.log('User not found')
  }
  return user
}

// 删除记录
async function deleteUser(id) {
  const user = await User.findByPk(id)
  if (user) {
    await user.destroy()
    console.log('User deleted')
  } else {
    console.log('User not found')
  }
  return user
}

export default {
  createUser,
  findAllUsers,
  findUserById,
  findUserByPhone,
  updateUser,
  deleteUser
}

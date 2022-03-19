const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/users');
const factory = require('./handler.factory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, { active: false });
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Crete error if user post password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }
  // 3) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // 4) Update user document
  const user = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  // return error if user does not exist
  if (!user) {
    return next(new AppError('No user found', 404));
  }

  // 5) Return updated user to client
  res.status(200).json({
    status: 'success',
    data: {
      user: user,
    },
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

exports.getAllUsers = factory.getAll(User);
exports.getOneUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
// Do not update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

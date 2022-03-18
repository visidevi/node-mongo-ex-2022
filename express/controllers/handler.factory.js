const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.getOne = (Model, optPopulate) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findById(req.params.id).populate(optPopulate);
    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        document,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDocument = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newDocument,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.query);

    // Execute query
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;
    // Send Response
    res.status(200).json({
      status: 'success',
      data: {
        results: tours.length,
        tours,
      },
    });
  });

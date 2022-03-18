// Review, rating, createdAd, updatedAd, ref to tour, ref to user
const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, 'Please enter a review'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please enter a rating'],
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      //   required: [true, 'Please enter an user'],
    },
    tour: {
      type: Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
  },
  {
    timestamps: true,
    versionKey: false, // this will create a virtual field called
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  }).populate({
    path: 'tour',
    select: 'name',
  });
  next();
});
module.exports = model('Review', reviewSchema);

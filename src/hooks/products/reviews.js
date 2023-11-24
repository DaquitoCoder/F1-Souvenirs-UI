import axios from '../axios';

export const getReviews = async (productId) =>
  axios.get(`/review/product/${productId}`);

export const createReview = async (review) => axios.post(`/review/`, review);

export const updateReview = async (reviewId, review) =>
  axios.put(`/review/${reviewId}`, review);

export const deleteReview = async (reviewId) =>
  axios.delete(`/review/${reviewId}`);

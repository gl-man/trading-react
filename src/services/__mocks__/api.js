const api = {
  get: jest.fn().mockResolvedValue(),
  post: jest.fn().mockResolvedValue(),
  put: jest.fn().mockResolvedValue(),
  delete: jest.fn().mockResolvedValue(),
};

export default api;

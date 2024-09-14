class UnauthorizedError extends Error {
  constructor(message = 'Not Authorized') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export { UnauthorizedError };

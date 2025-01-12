export function requestErrorHandler(controller) {
  return async (req, res, next) => {
    try {
      return await controller(req, res);
    } catch (error) {
      next(error);
    }
  };
}

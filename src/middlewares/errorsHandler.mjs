import Boom from '@hapi/boom';

export function errorHandler(err, req, res, next) {
  if (Boom.isBoom(err)) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }

  return res.status(500).json({
    statusCode: 500,
    error: 'Internal Server Error',
    message: err.message || 'Ha ocurrido un error inesperado',
  });
}

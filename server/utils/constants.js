const code = require('http-status-codes')
const statusCodes = code.StatusCodes
module.exports = {
    responseStatus: {
        code_201: statusCodes.CREATED,
        code_200: statusCodes.OK,
        code_400: statusCodes.BAD_REQUEST,
        code_401: statusCodes.UNAUTHORIZED,
        code_500: statusCodes.INTERNAL_SERVER_ERROR,
        code_404: statusCodes.NOT_FOUND,
        code_403: statusCodes.FORBIDDEN,
        code_406: statusCodes.NOT_ACCEPTABLE,
    }
}
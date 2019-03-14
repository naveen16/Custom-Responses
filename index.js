const customResponses = {
    success(data) {
        return this.status(200).json({
            success: true,
            data,
        });
    },

    successPagination(data, skip) {
        return this.status(200).json({
            success: true,
            data,
            skip
        });
    },

    unauthorized(message) {
        return this.status(401).json({
            success: false,
            error: 'unauthorized',
            message,
        });
    },

    preconditionFailed(customError) {
        return this.status(412).json({
            success: false,
            error: customError || 'precondition_failed',
        });
    },

    validationError(error) {
        if (!error || !error.errors) {
            return this.serverError();
        }

        let errorResponse = {};
        const typeFields = extractValidationType(error.errors);
        if (typeFields.length > 0) {
            errorResponse = typeFields;
        }

        return this.unprocessableEntity(errorResponse);
    },

    blocked() {
        return this.status(410).json({
            success: false,
            error: 'version_blocked',
        });
    },

    unprocessableEntity(customError, property) {
        return this.status(422).json({
            success: false,
            error: 'unprocessable_entity',
            message: customError,
            property: property
        });
    },

    notFound() {
        return this.status(404).json({
            success: false,
            error: 'not_found',
        });
    },

    serverError() {
        return this.status(503).json({
            success: false,
            error: 'server_error',
        });
    },
};

module.exports = (req, res, next) => {
    Object.assign(res, customResponses);
    next();
};

function extractValidationType(errors) {
    const fields = Object.keys(error);
    return fields.map( key => errors[key] ).map( validation => ({ errorOnField: validation.path, message: validation.message }));
}

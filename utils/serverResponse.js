let defaultResponse = {
    success: true
};

let defaultError = {
    success: false
};

module.exports = {
    createSuccessMessage(message, data) {
        if(message) {
            return Object.assign(defaultResponse, {
                message
            })
        }
        if(data) {
            return Object.assign(defaultResponse, {
                data
            })
        }
        if(data && message) {
            return Object.assign(defaultResponse, {
                data,
                message
            })
        }
        return defaultResponse
    },

    createErrorMessage(message, data) {
        if(message) {
            return Object.assign(defaultError, {
                message
            })
        }
        if(data) {
            return Object.assign(defaultError, {
                data
            })
        }
        if(data && message) {
            return Object.assign(defaultError, {
                data,
                message
            })
        }
        return defaultError
    }
};
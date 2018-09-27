module.exports = {
    checkModelResult(result) {
        if(Array.isArray(result) && result.length > 0) {
            result = result[0];
        } else {
            result = null;
        }
        return result;
    }
};
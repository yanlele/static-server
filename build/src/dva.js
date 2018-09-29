export default {
    config() {
        return {
            onError(err) {
                err.preventDefault();
                window.console.error(err.message);
            },
        };
    },
};

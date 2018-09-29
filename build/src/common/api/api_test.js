const axios = window.axios;
let methodObj = {
    url: '/test',
    method: 'get',
    params: {},
    data: {}
};

export function signIn(url, options, type) {
    let query = Object.assign({}, methodObj, {
        method: type,
        data: options,
        params: options
    });
    return axios(query);
}

import {routerRedux} from 'dva/router';

export default {
    namespace: 'global',
    state: {
        text: 'hello umi+dva',
        name: 'yanle',
        login: false,
    },
    reducers: {
        setText(state, payload) {
            const rebuildReturn = Object.assign(state, payload.data);
            return {
                ...state
            };
        },
        signin(state) {
            return {
                ...state,
                login: true,
            };
        },
    },
    effects: {
        login(action, {call, put}) {
            put({
                type: 'signin',
            });
            put(routerRedux.push('/admin'));
        },
        throwError() {
            throw new Error('hi error');
        },
    },
};

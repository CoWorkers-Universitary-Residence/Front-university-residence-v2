// auth.module.js
// Vuex Authentication Module
import AuthService from '../authentication/services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

let initialState = { status: { loggedIn: false }, user: null, type: null };
if (user != null) {
    initialState.user = user;
    if (user.description == null) initialState.type = "customer";
    else initialState.type = "agency";
}

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                });
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
            if(state.user.description == null) state.type = "customer";
            else state.type = "agency";
        },
        checkType(state){
            if(state.user.description == null) state.type = "customer";
            else state.type = "agency";
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.type = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.type = null;
        },
    }
}

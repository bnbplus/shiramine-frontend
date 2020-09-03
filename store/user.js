export const state = () => ({
    loginToken: null,
    userRole: null,
})

export const mutations = {
    setLoginToken(state, loginToken){
        state.loginToken = loginToken
    },
    setUserRole(state, userRole){
        state.userRole = userRole
    }
}
export const state = () => ({
    loginToken: null,
    bnbToken: null,
    userRole: null,
    userId:null
})

export const mutations = {
    setLoginToken(state, loginToken){
        state.loginToken = loginToken
    },
    setBnbToken(state, bnbToken) {
        state.bnbToken = bnbToken
    },
    setUserRole(state, userRole){
        state.userRole = userRole
    },
    serUserId(state, userId){
        state.userId = userId
    }
}
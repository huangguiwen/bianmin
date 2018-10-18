const getters = {
    sidebar: state => state.app.sidebar,
    authKey: state => state.user.authKey,
    userInfo: state => state.user.userInfo,
    roles: state => state.user.roles,
    permissionRoutes: state => state.permission.routers
}
export default getters

const getters = {
  sidebar: state => state.app.sidebar,
//   device: state => state.app.device,
  authKey: state => state.user.authKey,
//   avatar: state => state.user.avatar,
//   name: state => state.user.name,
  userInfo: state => state.user.userInfo
}
export default getters

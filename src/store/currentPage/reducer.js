export default function curentPage(state = "login", action) {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return action.page;
    default:
      return state;
  }
}

export default function currentPage(state = "login", action) {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return action.page;
    default:
      return state;
  }
}

export default function curentPage(state = "", action) {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return action.page;
    default:
      return state;
  }
}

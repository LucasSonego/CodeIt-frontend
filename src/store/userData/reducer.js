export default function UserData(state = {}, action) {
  switch (action.type) {
    case "SET_USER_DATA":
      return action.userData;
    default:
      return state;
  }
}

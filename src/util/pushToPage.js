export default function pushToPage({ page, dispatch, history }) {
  dispatch({
    type: "SET_CURRENT_PAGE",
    page,
  });

  history.push(`/${page}`);
}

export const GET_SETTINGS = "GET_SETTINGS";

export const getSettings = (id) => async (dispatch) => {
  fetch(`http://localhost:3000/users/${id}/settings`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      dispatch({
        type: GET_SETTINGS,
        settings: json.settings,
      });
    });
};

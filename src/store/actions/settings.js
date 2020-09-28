export const GET_SETTINGS = "GET_SETTINGS";

export const getSettings = () => async (dispatch) => {
  fetch("https://keep-up-mock.herokuapp.com/api/settings", {
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

export const GET_SETTINGS = "GET_SETTINGS";
export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

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

export const updateSettings = (id, settings) => async (dispatch) => {
  fetch(`http://localhost:3000/users/${id}/settings`, {
    method: "PATCH",
    body: JSON.stringify({
      settings,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.response) {
        dispatch({
          type: UPDATE_SETTINGS,
          settings,
        });
      }
    });
};

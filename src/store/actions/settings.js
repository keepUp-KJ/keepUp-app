export const GET_SETTINGS = "GET_SETTINGS";
export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

export const getSettings = (id, token) => async (dispatch) => {
  return fetch(`https://rocky-mesa-61495.herokuapp.com/users/${id}/settings`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.settings) {
        dispatch({
          type: GET_SETTINGS,
          settings: json.settings.settings,
        });
      }
    });
};

export const updateSettings = (id, settings, token) => async (dispatch) => {
  return fetch(`https://rocky-mesa-61495.herokuapp.com/users/${id}/settings`, {
    method: "PATCH",
    body: JSON.stringify({
      settings,
    }),
    headers: {
      Authorization: "Bearer " + token,
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

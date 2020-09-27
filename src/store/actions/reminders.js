export const SET_REMINDERS = "SET_REMINDERS";

export const getReminders = () => async (dispatch) => {
  fetch("https://keep-up-mock.herokuapp.com/api/reminders", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => {
      dispatch({
        type: SET_REMINDERS,
        reminders: json.reminders,
      });
    });
};

export const addReminder = () => async (dispatch) => {
  fetch("https://keep-up-mock.herokuapp.com/api/reminders", {
    method: "POST",
  });
};

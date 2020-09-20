export const ACCEPT_CONTACT = "ACCEPT_CONTACT";
export const REJECT_CONTACT = "REJECT_CONTACT";
export const UNREJECT_CONTACT = "UNREJECT_CONTACT";

export const acceptContact = (contact) => async (dispatch) => {
  dispatch({
    type: ACCEPT_CONTACT,
    contact,
  });
};

export const rejectContact = (contact) => async (dispatch) => {
  dispatch({
    type: REJECT_CONTACT,
    contact,
  });
};

export const unrejectContact = (contact) => async (dispatch) => {
  dispatch({
    type: UNREJECT_CONTACT,
    contact,
  });
};

export const ACCEPT_CONTACT = "ACCEPT_CONTACT";
export const REJECT_CONTACT = "REJECT_CONTACT";
export const UNREJECT_CONTACT = "UNREJECT_CONTACT";
export const SKIP_PICK = "SKIP_PICK";

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

export const skipPicking = () => async (dispatch) => {
  dispatch({
    type: SKIP_PICK,
  });
};

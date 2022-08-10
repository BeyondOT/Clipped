import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const uploadPicture = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios
        .post(`${process.env.REACT_APP_API_URL}/user/upload`, data)
        .then((res) => {
          dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
        });
    } catch (err) {
      return console.log(err);
    }
  };
};

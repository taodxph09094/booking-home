import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import logoTix from "../logo/logoTix.png";

import { makeStyles } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import { resetPassword, clearErrors } from "../../../actions/userAction";
const useStyles = makeStyles((theme) => ({
  eye: {
    position: "absolute",
    top: 32,
    right: 9,
    cursor: "pointer",
    color: "#000",
  },
  logoTix: {
    width: "209px",
    marginBottom: "13px",
    cursor: "pointer",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    textAlign: "center",
    marginBottom: "30px",
  },
}));
const ResetPass = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const classes = useStyles();
  const theme = useTheme();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Thay đổi mật khẩu thành công");

      history.push("/login");
    }
  }, [dispatch, error, alert, history, success]);
  return (
    <div className="text-light" style={{ padding: "60px 32px 30px" }}>
      <div className="container">
        <img src={logoTix} alt="logoTix" className={classes.logoTix} />
        <p className={classes.text}>
          Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!
        </p>
      </div>
      <div>
        <form
          className="col-sm-10 mx-auto"
          encType="multipart/form-data"
          onSubmit={resetPasswordSubmit}
        >
          <div className="form-group position-relative">
            <label>Mật khẩu&nbsp;</label>

            <input
              type="text"
              className="form-control"
              name="password"
              placeholder="Nhập mật khẩu mới để tiếp tục"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group position-relative">
            <label>Nhập lại mật khẩu&nbsp;</label>

            <input
              type="text"
              className="form-control"
              name="password"
              placeholder="Nhập lại mật khẩu mới để tiếp tục"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            style={{
              backgroundColor: "#3E63b6",
              borderColor: "#3E63b6",
              cursor: "pointer",
            }}
            // disable={errorLogin?.toString()}
            type="submit"
            className="btn btn-success mt-3 container"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;

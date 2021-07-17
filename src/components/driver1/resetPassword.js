import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const resetHandler = () => {
    console.log(window.location.pathname.split("/")[3]);
    console.log(password);
    axios
      .post("http://localhost:3001/api/updateDriverPassword", {
          password: password,
          passwordToken: window.location.pathname.split("/")[3],
        },
      )
      .then((res) => {
          console.log("Success")
          toast.success("Password updated",{
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: true,
            closeOnClick: true,
        });
      });
  };
  return (
    <div>
        <ToastContainer />
      <div class="offset-md-2 col-md-8 text-center">
        <div className="col-md-12">
          <input
            type="password"
            name="password"
            className="form-control mt-3"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
          />
        </div>
        <div className="col-md-12 text-center mt-5">
          <input
            className="btn btn-outline-primary"
            onClick={resetHandler}
            type="submit"
            name="submit"
            value="submit"
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

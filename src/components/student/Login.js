import { React, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API } from "../config";

export function Student() {
  const [reg, setreg] = useState("");
  const [password, setPassword] = useState("");
  const signInHandler = (e) => {
    e.preventDefault();
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (reg.length < 1 || password < 1) {
      toast.error("all fields are mandatory", {
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: true,
        closeOnClick: false,
      });
    } else {
      let data = {
        regNumber: reg,
        password,
      };

      API.post("studentlogin", data)
        .then((res) => {
          sessionStorage.setItem("regNumber", reg);
          window.location = "/student";
          toast.success("LoggedIn Successfull");
          // toast.success("")
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };
  return (
    <>
      <ToastContainer />

      <div className="row">
        <div class="offset-md-2 col-md-8 text-center">
          <div className="col-md-12">
            <h3 className="mb-1">Student Check IN</h3>

            <input
              type="text"
              name="reg"
              className="form-control"
              onChange={(e) => setreg(e.target.value)}
              value={reg}
              placeholder="Registration Number"
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              name="dest"
              className="form-control mt-3"
              onChange={(e) =>
                sessionStorage.setItem("studentDest", e.target.value)
              }
              placeholder="Destination"
            />
          </div>

          <div className="col-md-12">
            <input
              type="password"
              name="password"
              className="form-control mt-3"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
          </div>

          <div className="col-md-12 text-center mt-5">
            <input
              className="btn btn-outline-primary"
              onClick={signInHandler}
              type="submit"
              name="submit"
              value="submit"
            />
          </div>
        </div>
      </div>
    </>
  );
}

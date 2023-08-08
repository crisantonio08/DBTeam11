import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    var sessionAuth = getAuth();
    var user = sessionAuth.currentUser;

    if (user) {
      navigate("/allbonds");
    }
  });

  const onLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((_) => {
        // Signed in
        navigate("/allbonds");
        console.log("Navigating to allbonds from signInWithEmailAndPassword");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <main className="container">
        <section className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <p className="h2 text-center">BondApp</p>

            <form>
              <div className="form-group">
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="form-control"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary w-100" onClick={onLogin}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;

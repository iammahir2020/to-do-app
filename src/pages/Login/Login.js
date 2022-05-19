import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useSignInWithEmailAndPassword,
  useSendPasswordResetEmail,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { toast } from "react-toastify";
import axios from "axios";
import useToken from "../../hooks/useToken";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  let from = location.state?.from?.pathname || "/";
  const [signInWithEmailAndPassword, user, loading, signInError] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, passwordResetError] =
    useSendPasswordResetEmail(auth);
  const [token] = useToken(user);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate, from]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let errorMessage;

  if (signInError || passwordResetError) {
    errorMessage = (
      <p className="text-red-500">
        {signInError?.message}
        {passwordResetError?.message}
      </p>
    );
  }

  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
  };

  // password reset work remaining
  const handleForgotPassword = async () => {
    if (/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
      await sendPasswordResetEmail(email);
      toast("Reset password email sent");
    }
  };
  return (
    <div className="my-20 px-2">
      <div className="card lg:max-w-md shadow-xl mx-auto">
        <div className="card-body">
          <h2 className="text-center text-2xl font-semibold mb-8">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="type here"
                className="input input-bordered w-full max-w-md"
                {...register("email", {
                  onBlur: (event) => setEmail(event.target.value),
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide valid Email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-md">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="type here"
                className="input input-bordered w-full max-w-md"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            <div className="flex justify-end">
              <small onClick={handleForgotPassword} className="link link-hover">
                Forgot password?
              </small>
            </div>
            {errorMessage}
            {loading || sending ? (
              <button className="btn btn-primary text-white w-full max-w-md loading">
                loading
              </button>
            ) : (
              <input
                className="btn btn-primary text-white w-full max-w-md"
                type="submit"
                value="Login"
              />
            )}
          </form>
          <p className="text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="link link-hover text-primary"
            >
              Create new account
            </span>
          </p>
          <div className="divider">OR</div>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;

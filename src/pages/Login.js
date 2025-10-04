// src/pages/Login.js
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Login submitted:", data);
    dispatch(loginUser(data));
    setTimeout(() => {
      window.location.href = "/";
    }, 200);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        {...register("email")}
        placeholder="email@example.com"
      />
      <p>{errors.email?.message}</p>

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type={passwordVisible ? "text" : "password"}
        {...register("password")}
        placeholder="Enter password"
        onCopy={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
      />
      <p>{errors.password?.message}</p>

      <label>
        <input
          type="checkbox"
          onChange={() => setPasswordVisible(!passwordVisible)}
        />{" "}
        Show Password
      </label>

      <button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

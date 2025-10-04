import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
const schema = yup.object({
  username: yup
    .string()
    .required("username is required")
    .min(3, "username must be of minimum 3 words")
    .max(20, "username can not greater then 30 words")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "username must contains only a to z,A TO Z,0-9 and _"
    ),
  email: yup
    .string()
    .required("email musst be provided")
    .email("enter valid email"),
  password: yup
    .string()
    .min(6, "must be greater then 6")
    .required()
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[@$!%*?&]/, "Must contain a special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password Must match")
    .required(),
});
export default function Register() {
  const [passwordStrength, setPasswordStrength] = React.useState("");
  const dispatch = useDispatch();
  // useForm gives helpers: register connects inputs, handleSubmit handles submit
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // onSubmit will receive an object with all registered field values
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    dispatch(registerUser(data));
    reset();
    setTimeout(() => {
      window.location.href = "/";
    }, 200);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.length < 6) setPasswordStrength("Weak");
    else if (value.match(/[A-Z]/) && value.match(/[0-9]/))
      setPasswordStrength("Strong");
    else setPasswordStrength("Medium");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Username</label>
      {/* register("username") wires this input into RHF under key "username" */}
      <input id="username" {...register("username")} placeholder="username" />
      <p>{errors.username?.message}</p>

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
        type="password"
        {...register("password")}
        placeholder="Enter Paassword"
        onCopy={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onChange={handlePasswordChange}
      />
      <p>Password strength: {passwordStrength}</p>
      <p>{errors.password?.message}</p>

      <label htmlFor="confirmPassword">Re-Enter Password</label>
      <input
        id="confirmPassword"
        type="password"
        {...register("confirmPassword")}
        placeholder="Enter password again"
        onCopy={(e) => e.preventDefault()}
        onPaste={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
      />
      <p>{errors.confirmPassword?.message}</p>
      <button type="submit" disabled={!isValid || !isDirty || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

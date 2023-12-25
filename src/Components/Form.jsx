import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

let passwordRegex =
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
let phoneNumberRegex = /^[0-9]+$/;

export const Schema = yup.object().shape({
  fullName: yup
    .string()
    .required("required")
    .strict(true)
    .trim("white spaces before/after name are not allowed "),
  email: yup.string().email().required("Please write correct email using @ "),
  password: yup.string().required().matches(passwordRegex, {
    message:
      "Password must be one capital, spacial and number character, and length 8",
  }),
  phoneNumber: yup
    .string()
    .required("Must be only digits")
    .min(10)
    .max(10)
    .matches(phoneNumberRegex),
});

const Form = () => {
  const form = useForm({
    resolver: yupResolver(Schema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    console.log(data);
  };

  const onCancel = () => {
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Box mt={5} textAlign={"center"}>
          <Box>
            <TextField
              id="outlined-basic"
              label="Full Name"
              type="text"
              variant="outlined"
              name="fullName"
              {...register("fullName")}
              error={!!errors.fullName}
              helperText={errors ? errors.fullName?.message : ""}
            />
            <TextField
              sx={{ marginLeft: "13px" }}
              id="outlined-basic"
              label="Email"
              type="email"
              variant="outlined"
              {...register("email")}
              name="email"
              error={!!errors.email}
              helperText={errors ? errors.email?.message : ""}
            />
          </Box>

          <Box mt={2}>
            <TextField
              id="outlined-basic"
              label="Phone number"
              type="number"
              variant="outlined"
              {...register("phoneNumber")}
              name="phoneNumber"
              error={!!errors.phoneNumber}
              helperText={errors ? errors.phoneNumber?.message : ""}
            />
            <TextField
              sx={{ marginLeft: "13px" }}
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              {...register("password")}
              name="password"
              error={!!errors.password}
              helperText={errors ? errors.password?.message : ""}
            />
          </Box>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button onClick={onCancel} variant="contained" type="submit">
            Cancel
          </Button>
        </Box>
      </div>
    </form>
  );
};

export default Form;

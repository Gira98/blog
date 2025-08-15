import * as yup from "yup";

export const emailSchema = yup
  .string()
  .required("email is required")
  .email("invalid email");

export const passwordSchema = yup
  .string()
  .required("password is required")
  .min(6)
  .max(40);

export const usernameSchema = yup
  .string()
  .required("username is required")
  .min(3)
  .max(20);

export const titleSchema = yup.string().required("Title is required");
export const descriptionSchema = yup
  .string()
  .required("Description is required");
export const textSchema = yup.string().required("Text is required");

export const userSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = yup.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const articleSchema = yup.object({
  title: titleSchema,
  description: descriptionSchema,
  body: textSchema,
  tagList: yup.array().of(yup.string()),
});

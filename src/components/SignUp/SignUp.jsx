import React from "react";
import styles from "../../assets/styles/shared.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "antd";
import { useRegisterUserMutation } from "../../store/authApi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import {
  usernameSchema,
  emailSchema,
  passwordSchema,
} from "../../utils/validationSchemas";

const schema = yup.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirm: yup.string().oneOf([yup.ref("password")], "passwords must match"),
  agreement: yup
    .boolean()
    .oneOf([true], "you must agree to the processing of personal information"),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [addUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notify = (err) => toast(err);

  const handleAddUser = async (userData) => {
    const user = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };

    try {
      const result = await addUser({ user }).unwrap();
      dispatch(setCredentials({ user: result.user, token: result.user.token }));
      navigate("/articles");
    } catch (error) {
      console.error("Registration error:", error);

      const serverError = error.data.errors;
      const arr = Object.keys(serverError);
      const errorKey = arr[0];

      notify(`${errorKey} ${serverError[errorKey]}`);
    }
  };

  const onSubmit = (data) => {
    handleAddUser(data);
  };

  return (
    <form
      name="sign-up"
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.container}>
        <div className={styles.header}>Create a new account</div>

        <label className={styles.label}>
          Username
          <input
            {...register("username")}
            placeholder="Username"
            className={`${styles.input} ${errors.username && styles.inputError}`}
          />
        </label>
        <p className={styles.error}>{errors.username?.message}</p>

        <label className={styles.label}>
          E-mail
          <input
            {...register("email")}
            placeholder="E-mail address"
            className={`${styles.input} ${errors.email && styles.inputError}`}
          />
        </label>
        <p className={styles.error}>{errors.email?.message}</p>

        <label className={styles.label}>
          Password
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={`${styles.input} ${errors.password && styles.inputError}`}
          />
        </label>
        <p className={styles.error}>{errors.password?.message}</p>

        <label className={styles.label}>
          Repeat password
          <input
            type="password"
            {...register("confirm")}
            placeholder="Repeat password"
            className={`${styles.input} ${errors.confirm && styles.inputError}`}
          />
        </label>
        <p className={styles.error}>{errors.confirm?.message}</p>

        <div className={styles.agreement}>
          <label className={styles.checkbox}>
            <input type="checkbox" {...register("agreement")} />
            <span>I agree to the processing of my personal information</span>
          </label>
          <p className={styles.error}>{errors.agreement?.message}</p>
        </div>

        <Button type="primary" htmlType="submit" className={styles.button}>
          Create
        </Button>

        <div className={styles.question}>
          Already have an account?{" "}
          <Link to="/sign-in" className={styles.link}>
            Sign In
          </Link>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </form>
  );
};

export default SignUp;

import React from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../assets/styles/shared.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginUserMutation } from "../../store/authApi";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { userSchema } from "../../utils/validationSchemas";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [loginUser] = useLoginUserMutation();

  const notify = (err) => toast(err);

  const handleLoginUser = async (user) => {
    try {
      const result = await loginUser({ user }).unwrap();
      console.log("Logged user:", result);
      dispatch(setCredentials({ user: result.user, token: result.user.token }));
      navigate('/articles')
    } catch (error) {
      console.error("Login error:", error);

      const serverError = error.data.errors;
      const arr = Object.keys(serverError);
      const errorKey = arr[0];

      notify(`${errorKey} ${serverError[errorKey]}`);
    }
  };

  const onSubmit = (data) => {
    handleLoginUser(data);
  };

  return (
    <form
      name="sign-in"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <div className={styles.header}>Sign In</div>

      <div className={styles.container}>
        <label className={styles.label}>
          E-mail:
          <input
            {...register("email")}
            placeholder="E-mail"
            className={`${styles.input} ${errors.email && styles.inputError}`}
          />
        </label>

        <p className={styles.error}>{errors.email?.message}</p>

        <label className={styles.label}>
          Password:
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={`${styles.input} ${errors.email && styles.inputError}`}
          />
        </label>

        <p className={styles.error}>{errors.password?.message}</p>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={styles.button}
          >
            Sign In
          </Button>
      </div>

      <div className={styles.question}>
        Don't have an account?{" "}
        <Link to="/sign-up" className={styles.link}>
          Sign Up
        </Link>
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

export default SignIn;

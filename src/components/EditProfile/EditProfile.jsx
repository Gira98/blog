import React, { useEffect, useState } from "react";
import styles from "../../assets/styles/shared.module.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "antd";
import { useUpdateUserMutation } from "../../store/authApi";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCredentials } from "../../slices/authSlice";
import { usernameSchema, emailSchema } from "../../utils/validationSchemas";

const schema = yup.object({
  username: usernameSchema,
  email: emailSchema,
  password: yup.string().nullable(),
  image: yup.string().url().nullable(),
});

function EditProfile() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { username: "", email: "", image: null },
  });

  const [isImageValid, setImageValid] = useState(true);

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const [editUser] = useUpdateUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = (err) => toast(err);

  const handleEditUser = async (userData) => {
    const user = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      image: userData.image,
    };

    try {
      const result = await editUser({ user }).unwrap();
      dispatch(setCredentials({ user: result.user, token: result.user.token }));
      navigate("/articles");
      console.log("Updated user:", result);
    } catch (error) {
      console.error("Edit user error:", error);

      const serverError = error.data.errors;
      const arr = Object.keys(serverError);
      const errorKey = arr[0];

      notify(`${errorKey} ${serverError[errorKey]}`);
    }
  };

  const onSubmit = (data) => {
    handleEditUser(data);
  };

  return (
    <form name="edit" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div className={styles.header}>Edit profile</div>

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
          New password
          <input
            {...register("password")}
            type="password"
            placeholder="New password"
            className={`${styles.input} ${errors.password && styles.inputError}`}
          />
        </label>
        <p className={styles.error}>{errors.password?.message}</p>

        <label className={styles.label}>
          Avatar img (url)
          <input
            type="url"
            {...register("image")}
            placeholder="Avatar image"
            className={`${styles.input} ${errors.image && styles.inputError}`}
          />
        </label>
        <p className={styles.error}>{errors.image?.message}</p>
        {!isImageValid && <p style={{ color: "red" }}>Image not found</p>}

        <img
          src={watch("image")}
          alt=""
          style={{ display: "none" }}
          onLoad={() => setImageValid(true)}
          onError={() => setImageValid(false)}
        />

        <Button
          type="primary"
          htmlType="submit"
          className={styles.button}
          disabled={!isImageValid}
        >
          Save
        </Button>
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
}

export default EditProfile;

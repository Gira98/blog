import styles from "./Header.module.scss";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { logOut, selectCurrentUser } from "../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link className={styles.header} to="/articles">
          <span>Realworld blog</span>
        </Link>

        <div className={styles.nav}>
          {currentUser ? (
            <div className={styles.user}>
              <Link to="/new-article">
                <Button className={styles.button}>Create an article</Button>
              </Link>
              <Link className={styles.username} to="/profile">
                <span>{currentUser.username}</span>
                <img
                  src={
                    currentUser.image ||
                    "https://img.icons8.com/?size=100&id=22396&format=png&color=000000"
                  }
                  alt="avatar"
                  className={styles.avatar}
                />
              </Link>
              <Button
                onClick={handleClick}
                className={styles.logOut}
                size="large"
              >
                Log Out
              </Button>
            </div>
          ) : (
            <div className={styles.buttons}>
              <Link to="/sign-in">
                <Button className={styles.button}>Sign In</Button>
              </Link>
              <Link to="/sign-up">
                <Button className={styles.button}>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

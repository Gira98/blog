import React from "react";
import styles from "./Article.module.scss";
import Markdown from "markdown-to-jsx";
import { format } from "date-fns";
import { Tag, Spin, Alert, Button, Popconfirm } from "antd";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetArticleBySlugQuery,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from "../../store/articlesApi";
import { HeartTwoTone, HeartFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../slices/authSlice";

function Article() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  const [deleteArticle] = useDeleteArticleMutation();
  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unfavoriteArticle] = useUnfavoriteArticleMutation();

  const handleDate = (date = new Date()) =>
    format(new Date(date), "MMMM d, yyyy");

  const { data, isLoading, error } = useGetArticleBySlugQuery(slug || "", {
    refetchOnMountOrArgChange: true,
  });

  const handleLike = async () => {
    if (!currentUser) {
      return;
    }

    try {
      if (article.favorited) {
        await unfavoriteArticle(slug).unwrap();
      } else {
        await favoriteArticle(slug).unwrap();
      }
    } catch (error) {
      console.error("Ошибка при обработке лайка", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteArticle(slug).unwrap();
      navigate("/articles");
    } catch (error) {
      console.error("Ошибка при удалении статьи:", error);
    }
  };

  if (isLoading)
    return (
      <div className={styles.spinnerContainer}>
        <Spin size="large" />
      </div>
    );
  if (error || !data || !data.article)
    return (
      <Alert
        message="Error"
        description={`${error.data.errors.message} ${error.status}`}
        type="error"
        showIcon
      />
    );

  const { article } = data;

  return (
    <article className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <div>
            <div className={styles.title}>{article.title}</div>
            <div className={styles.tags}>
              {article.tagList?.length > 0 ? (
                article.tagList.map((tag) => (
                  <Tag className={styles.tag} key={tag}>
                    {tag}
                  </Tag>
                ))
              ) : (
                <Tag>No tags</Tag>
              )}
            </div>
          </div>
          <div className={styles.likes}>
            <Button
              type="text"
              icon={
                article.favorited ? (
                  <HeartFilled style={{ color: "#eb2f96" }} />
                ) : (
                  <HeartTwoTone twoToneColor="#eb2f96" />
                )
              }
              onClick={handleLike}
              className={styles.likeButton}
              disabled={!currentUser}
              title={!currentUser ? "Sign in to like" : ""}
            >
              {article.favoritesCount || 0}
            </Button>
          </div>
        </div>

        <div className={styles.header__right}>
          <div className={styles.user_date}>
            <div className={styles.user}>{article.author.username}</div>
            <div className={styles.date}>{handleDate(article.createdAt)}</div>
          </div>
          <img
            src={
              article.author.image ||
              "https://api.realworld.io/images/smiley-cyrus.jpg"
            }
            alt="avatar"
            className={styles.avatar}
          />
        </div>
      </div>

      <div>
        <div className={styles.description}>
          {article.description}
          {currentUser && currentUser.username === article.author.username && (
            <div className={styles.buttons}>
              <Link to={`/articles/${slug}/edit`}>
                <Button type="dashed">Edit</Button>
              </Link>
              <Popconfirm
                title="Delete article"
                description="Are you sure you want to delete this article?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" danger>
                  Delete
                </Button>
              </Popconfirm>
            </div>
          )}
        </div>
        <div className={styles.markdown}>
          <Markdown className={styles.markdown}>{article.body}</Markdown>
        </div>
      </div>
    </article>
  );
}

export default Article;

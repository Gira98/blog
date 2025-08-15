import React from "react";
import styles from "./ArticleList.module.scss";
import Post from "../Post";
import { useGetArticlesQuery } from "../../store/articlesApi";
import { Pagination, Spin, Alert } from "antd";
import { useSearchParams } from "react-router-dom";

function ArticleList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const limit = 5;
  const { data, error, isLoading } = useGetArticlesQuery({
    page: pageFromUrl,
    limit,
  });

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Alert
        message="Error"
        description={`${error.data.errors.message} ${error.status}`}
        type="error"
        showIcon
      />
    );
  }

  const handlePageChange = (page) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className={styles.container}>
      <section className={styles.articles}>
        {data?.articles.length === 0
          ? null
          : data?.articles.map((el) => (
              <Post
                data={el}
                key={`${el.slug}-${el.description}-${el.title}`}
              />
            ))}

        <Pagination
          current={pageFromUrl}
          total={data?.articlesCount || 0}
          pageSize={limit}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </section>
    </div>
  );
}

export default ArticleList;

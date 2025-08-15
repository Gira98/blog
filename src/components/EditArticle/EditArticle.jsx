import React, { useEffect } from "react";
import shared from "../../assets/styles/shared.module.scss";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../slices/authSlice";
import {
  useEditArticleMutation,
  useGetArticleBySlugQuery,
} from "../../store/articlesApi";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { articleSchema } from "../../utils/validationSchemas";

function EditArticle() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(articleSchema),
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tagList: [""],
    },
  });

  const { slug } = useParams();
  const { data, isLoading } = useGetArticleBySlugQuery(slug || "");

  useEffect(() => {
    if (data && !isLoading) {
      reset(data.article);
    }
  }, [data, reset, isLoading]);

  console.log(data);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tagList",
  });

  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const [editArticle] = useEditArticleMutation();

  const onSubmit = async (formData) => {
    try {
      const cleanedTags = (formData.tagList || []).filter(
        (t) => t && t.trim() !== "",
      );
      const articleData = {
        title: formData.title,
        body: formData.body,
        description: formData.description,
        tagList: cleanedTags,
      };
      const result = await editArticle({
        slug,
        article: { article: articleData },
      }).unwrap();
      navigate(`/articles/${result.article.slug}`);
    } catch (e) {
      console.log(e);
    }
  };

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  if (data && data.article && user.username !== data.article.author.username) {
    navigate("/articles");
    return null;
  }

  return (
    <form
      name="edit-article"
      onSubmit={handleSubmit(onSubmit)}
      className={shared.articleForm}
    >
      <div className={shared.header}>Edit article</div>
      <div className={shared.container}>
        <label className={shared.label}>
          Title
          <input
            className={shared.input}
            {...register("title")}
            placeholder="Title"
          />
          {errors.title && (
            <p className={shared.error}>{errors.title.message}</p>
          )}
        </label>
        <label className={shared.label}>
          Short description
          <input
            className={shared.input}
            {...register("description")}
            placeholder="Description"
          />
          {errors.description && (
            <p className={shared.error}>{errors.description.message}</p>
          )}
        </label>
        <label className={shared.label}>
          Text
          <input
            className={shared.input}
            {...register("body")}
            placeholder="Text"
          />
          {errors.body && <p className={shared.error}>{errors.body.message}</p>}
        </label>
        <label className={shared.tags}>
          Tags
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                {...register(`tagList.${index}`)}
                className={shared.input}
                placeholder="Tag"
              />
              <Button type="text" danger onClick={() => remove(index)}>
                Delete
              </Button>
              {errors.tagList?.[index] && (
                <p className={shared.error}>{errors.tagList[index]?.message}</p>
              )}
            </div>
          ))}
          <Button type="dashed" onClick={() => append("")}>
            Add Tag
          </Button>
        </label>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className={shared.button}
        >
          Send
        </Button>
      </div>
    </form>
  );
}

export default EditArticle;

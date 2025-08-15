import React from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../slices/authSlice";
import { useCreateArticleMutation } from "../../store/articlesApi";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import shared from "../../assets/styles/shared.module.scss";
import { articleSchema } from "../../utils/validationSchemas";

function NewArticle() {

  const {
    register,
    handleSubmit,
    control,
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tagList",
  });

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const [createArticle] = useCreateArticleMutation();

  const onSubmit = async (data) => {
    try {
      const result = await createArticle({ article: data }).unwrap();
      console.log(result);
      navigate(`/articles/${result.article.slug}`);
    } catch (e) {
      console.log(e);
    }
  };

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  return (
    <form
      name="create-article"
      onSubmit={handleSubmit(onSubmit)}
      className={shared.articleForm}
    >
      <div className={shared.header}>Create new article</div>
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
              <Button
                type="text"
                danger
                onClick={() => remove(index)}
              >
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

export default NewArticle;

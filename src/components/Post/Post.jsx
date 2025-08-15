import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Post.module.scss'
import { Tag, Button } from 'antd'
import { HeartTwoTone, HeartFilled } from '@ant-design/icons';
import { format } from 'date-fns'
import { useFavoriteArticleMutation, useUnfavoriteArticleMutation } from '../../store/articlesApi'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../slices/authSlice'

function Post({data}) {
  const currentUser = useSelector(selectCurrentUser);
  const [favoriteArticle] = useFavoriteArticleMutation();
  const [unfavoriteArticle] = useUnfavoriteArticleMutation();

  const handleDate = (date = new Date()) => format(new Date(date), 'MMMM d, yyyy')

  const handleLike = async () => {
    if (!currentUser) {
      return; 
    }
    
    try {
      if (data.favorited) {
        await unfavoriteArticle(data.slug).unwrap();
      } else {
        await favoriteArticle(data.slug).unwrap();
      }
    } catch (error) {
      console.error('Ошибка при обработке лайка', error);
    }
  };

  return (
  <div className={styles.container}>
      <div className={styles.header}>
          <div className={styles.header__left}>
        <div >
              <div className={styles.title}> 
                <NavLink to={`/articles/${data.slug}`}>{data.title}</NavLink>
              </div>
              <div className={styles.tags}>
              {data.tagList?.length > 0
                ? data.tagList.map((tag) => <Tag className={styles.tag} key={tag}>{tag}</Tag>)
                : <Tag >No tags</Tag>}
              </div>
        </div>
            <div className={styles.likes}>
            <Button 
              type="text" 
              icon={data.favorited ? <HeartFilled style={{ color: '#eb2f96' }} /> : <HeartTwoTone twoToneColor="#eb2f96" />}
              onClick={handleLike}
              className={styles.likeButton}
              disabled={!currentUser}
              title={!currentUser ? "Sign in to like" : ""}
            >
              {data.favoritesCount || 0}
            </Button>
          </div>
          </div>
          
          <div className={styles.header__right}>
            <div className={styles.user_date}>
              <div className={styles.user}>{data.author.username}</div>
              <div className={styles.date}>{handleDate(data.createdAt)}</div>
            </div>
            <img src={
              data.author.image ||
              "https://api.realworld.io/images/smiley-cyrus.jpg"
            } alt="avatar" className={styles.avatar} />
          </div>
        </div>
        <div className={styles.description}>{data.description}</div>
  </div>
  )
}

export default Post
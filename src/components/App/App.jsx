
import { Routes, Route } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import styles from './App.module.scss'
import Header from '../Header'
import ArticleList from '../ArticleList';
import Article from '../Article';
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import ErrorBoundary from "../ErrorBoundary";
import { Alert } from "antd";
import useAuthHook from "../../hooks/useAuthHook";
import EditProfile from "../EditProfile";
import NewArticle from "../NewArticle";
import EditArticle from "../EditArticle/EditArticle";



function App() {  
  useAuthHook()

  return (
    <>
      <Online>
        <ErrorBoundary>
          <div className={styles.app}>
            <Header />
            <main className={styles.main}>
              <Routes>
                <Route path="/" element={<ArticleList />} />
                <Route path='/articles' element={<ArticleList />} />   
                <Route path="/articles/:slug" element={<Article />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/profile' element={<EditProfile />} />
                <Route path='/new-article' element={<NewArticle />} />
                <Route path="/articles/:slug/edit" element={<EditArticle />} />
              </Routes>
            </main>
          </div>
        </ErrorBoundary>
      </Online>
      <Offline>
        <Alert message='Error' description='No internet connection' type='error' showIcon className={styles.error}/>
      </Offline>
    </>
  )
}

export default App



import React, { Suspense } from 'react';
import routes from './routes';
import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom"
import styles from './App.module.css';
import tokenUtils from './utils';

function RequireAuth(children) {
  if (!tokenUtils.getToken()) {
    return <Navigate to="/sign" replace />;
  }
  return children;
}

function App() {
  return (
    <div className={styles.App}> 
      <Routes>
        {
          routes.map((item, i) => {
            if (!item.auth) {
              return <Route key={i} path={item.path} element={
                <Suspense>
                  < item.component />
                </Suspense>
              } />
            } else {
              return (
                <Route key={i} path={item.path} element={
                  <Suspense>
                    {RequireAuth(<item.component />)}
                  </Suspense>
                } />
              )
            }
          })
        }
      </Routes>
    </div>
  );
}


export default App;

          // <Route path="/bokemanage/*" children= {[
          //   <Route path="" element={<Show />} key="1"></Route>,
          //   <Route path="list" key="2" element={<Show />}></Route>,
          //   // <Route path="edit" key="3" element={<BokeEdit/>}></Route>,
          //   <Route path="upload" key="4" element={<FileUpload />}></Route>,
          //   <Route path="category" key="5" element={<ShowCategory />}></Route>,
          //   <Route path="modify" key="6" element={<BokeModify />}></Route>
          // ]} element={<BokeManage />}></Route>

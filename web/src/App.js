import React from "react";
import Join from "./pages/Join";
import Regist from "./pages/Regist";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/layout/LayoutMain";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import "./index.css";
import LoginContainer from "./containers/LoginContainer";
import JoinContainer from "./containers/JoinContainer";
import Info from "./pages/Info";
import ModifyContainer from "./containers/ModifyContainer";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/join" component={JoinContainer} />
          <Route path="/regist" component={Regist} />
          <Route path="/set" component={Setting} />
          <Route path="/detail" component={Detail} />
          <Route path="/main" component={Main} />
          <Route path="/info" component={Info} />
          <Route path="/modify" component={ModifyContainer} />
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;

import { Switch, Route } from "react-router-dom";

import "./App.css";
import { Header } from "./components";
import { SellerRouter, UserRouter } from "./routers";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/seller" component={SellerRouter} />
        <Route path="/user" component={UserRouter} />
        <Route path="/" render={() => <main>main</main>} />
      </Switch>
    </>
  );
}

export default App;

import { Switch, Route } from "react-router-dom";

import "./notosansKR.css";
import { Main, Login, TeacherLogin } from "./components";

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/teacher/login" component={TeacherLogin} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Main} />
      </Switch>
    </>
  );
};

export default App;

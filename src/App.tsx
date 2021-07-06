import { Switch, Route, BrowserRouter } from "react-router-dom";

import { Main, Login, TeacherLogin } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/teacher/login" component={TeacherLogin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Main} />
        <Route
          component={() => {
            const daBoindaHaetje =
              "https://www.youtube.com/watch?v=DDYJysAYVWo";

            window.location.href = daBoindaHaetje;

            return null;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

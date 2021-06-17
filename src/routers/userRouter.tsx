import { Switch, Route } from "react-router-dom";

import { User } from "../components";

const UserRouter = () => {
  return (
    <Switch>
      <Route path="/seller" component={User} />
    </Switch>
  );
};

export default UserRouter;

import { Switch, Route } from "react-router-dom";

import { Seller } from "../components";

const SellerRouter = () => {
  return (
    <Switch>
      <Route path="/seller" component={Seller} />
    </Switch>
  );
};

export default SellerRouter;

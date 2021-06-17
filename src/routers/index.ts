import loadable from "@loadable/component";

export const SellerRouter = loadable(() => import("./sellerRouter"));
export const UserRouter = loadable(() => import("./userRouter"));

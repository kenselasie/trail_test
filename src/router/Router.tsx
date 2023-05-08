import Home from "../pages/Home";
import {
  Routes,
  Route,
} from "react-router-dom"
import { namedRoutes } from "./namedRoutes";
import Posts from "../pages/Posts";

export default function Router() {
  return (
    <Routes>
      <Route
        path={namedRoutes.home.index}
        element={
          <Home />
        } />
      <Route
        path={namedRoutes.home.posts}
        element={
          <Posts />
        } />
    </Routes>
  );
}

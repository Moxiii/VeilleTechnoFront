import { Route } from "react-router-dom";
import React, { lazy } from "react";
const About = lazy(() => import("@screen/About/About.jsx"));
const NotFound = lazy(() => import("@screen/NotFound/NotFound.jsx"));
const HomeRoute = lazy(() => import("@src/Stack/HomeRoute"));
import links from "@const/_const";

export function GlobalRoutes() {
  return (
    <>
      <Route index element={<HomeRoute />} />
      <Route path={links.about} element={<About />} />
      <Route path="*" element={<NotFound />} />
    </>
  );
}

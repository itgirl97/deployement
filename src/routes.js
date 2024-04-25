import Register from "views/examples/Register";
import Manual from "views/examples/Manual.js";
import Questions from "views/examples/Questions.js";
import Roles from "views/examples/Roles.js";
import Questionnaire from "views/examples/Questionnaire.js";

// test for push

var routes = [
  {
    path: "/register",
    name: "Home",
    icon: "ni ni-shop text-blue",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/manual",
    name: "Manual",
    icon: "ni ni-book-bookmark text-orange",
    component: <Manual />,
    layout: "/admin",
  },
  {
    path: "/question",
    name: "Questions",
    icon: "ni ni-chat-round text-green",
    component: <Questions />,
    layout: "/admin",
  },
  {
    path: "/questionnaire",
    name: "Questionnaire",
    icon: "ni ni-chat-round text-green",
    component: <Questionnaire />,
    layout: "/admin",
  },
  {
    path: "/roles",
    name: "Roles",
    icon: "ni ni-settings-gear-65 text-purple",
    component: <Roles />,
    layout: "/admin",
  },
];

export default routes;

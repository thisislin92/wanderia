import { createBrowserRouter, redirect } from "react-router-dom";
import FormQuery from "../views/FormQuery";

// Route definition
const router = createBrowserRouter([
  {
    path:'/',
    element: <App />
  },
  {
    path:'/form',
    element: <FormQuery />
  },
])


export default router
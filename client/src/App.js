

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Register from "./pages/Register";
import "./style.css"

const router = createBrowserRouter([
  {path: "/",
  element: <Home />

  },
  {path: "/register",
  element: <Register />

  },
  {path: "/login",
  element: <Login />

  },
  {path: "/posts/:id",
  element: <Single />

  },
  {path: "/write",
  element: <Write />

  }
])
function App() {




  return (
    <div>
      <div><RouterProvider router={router} /></div>
   
   
    </div>
  );
}

export default App;

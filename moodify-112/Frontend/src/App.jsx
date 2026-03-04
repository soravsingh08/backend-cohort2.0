
import {RouterProvider} from "react-router-dom";
import { router } from "./app.routes.jsx";
import "./features/shared/styles/global.scss"
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { SongContextProvider } from "./features/home/song.context.jsx";

function App() {
  return (
    <div>
      <SongContextProvider> 
        <AuthProvider>
        <RouterProvider router={router}/>
        </AuthProvider>
      </SongContextProvider>
    </div>
  );
}

export default App;
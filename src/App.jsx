import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { Toaster } from "sonner";
import SocketProvider from "./socket/SocketProvider.jsx";

const App = () => {
  return (
    <>
      <Toaster position="top-center" richColors expand />
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </>
  );
};

export default App;

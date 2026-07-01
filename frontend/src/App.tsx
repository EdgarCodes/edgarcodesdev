import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

function Layout() {
  // Page layout for webpage
  return (
    <div className="max-w-7xl mx-auto flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/projects", element: <Projects /> },
      { path: "/contact", element: <Contact /> },
      { path: "/error", element: <Error />},
      { path: "*", element: <NotFound/>}
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#1f1f1f]">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>

  );
}

export default App;

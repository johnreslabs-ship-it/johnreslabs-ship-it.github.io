import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import { usePageViewTracking } from "./lib/usePageViewTracking";
import Home from "./pages/Home";
import About from "./pages/About";
import YouTubePage from "./pages/YouTube";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import Downloads from "./pages/Downloads";
import Tools from "./pages/Tools";
import Linux from "./pages/Linux";
import Windows from "./pages/Windows";
import Networking from "./pages/Networking";
import VirtualMachines from "./pages/VirtualMachines";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  usePageViewTracking();
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/youtube" element={<YouTubePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/linux" element={<Linux />} />
        <Route path="/windows" element={<Windows />} />
        <Route path="/networking" element={<Networking />} />
        <Route path="/virtual-machines" element={<VirtualMachines />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

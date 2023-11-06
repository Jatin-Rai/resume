import "./page.scss";
import { About, Footer, Header, Skills, Work } from "@/sections";

export default function Home() {
  return (
    <div className="app">
      <Header />
      <About />
      <Work />
      <Skills />
      <Footer />
    </div>
  );
}

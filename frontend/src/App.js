import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
// React-router-dom
import { BrowserRouter,Routes,Route } from "react-router-dom";
// Pages
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/product/:id" element={<ProductPage/>} />
            </Routes>
            

          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

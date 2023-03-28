import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
// React-router-dom
import { BrowserRouter,Routes,Route } from "react-router-dom";
// Pages import 有default的 export 不用加 { }
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage/>} />
              <Route path="/profile" element={<ProfilePage/>} />

              <Route path="/product/:id" element={<ProductPage/>} />
              <Route path="/cart/:productId?" element={<CartPage/>} />

            </Routes>
            

          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

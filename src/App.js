
import React from "react";
import { useAuth } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginForm from "./views/Login";
import SignupForm from "./views/Signup";
import Home from "./views/Home";
import PageNotFound from "./components/PageNotFound";
import Cart from "./views/Cart";
import Profile from "./views/Profile";
import Checkout from "./views/Checkout";

function App() {
  const { currentUser } = useAuth();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={currentUser ? <Home /> : <LoginForm />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/cart"
            element={<Cart />}
          ></Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;


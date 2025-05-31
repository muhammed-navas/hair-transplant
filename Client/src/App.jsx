import { Homepage } from "./Pages/Homepage/Homepage";
import { Route, Routes, useLocation } from "react-router-dom";
import { QuestionnairePage } from "./Pages/Questionnaire/QuestionnairePage/QuestionnairePage";
import { Allproduct } from "./Pages/ProductPage/Allproduct";
import { Header } from "./componets/Header/Header";
import { PageTransition } from "./componets/animation/Animationpage";
import { CartPage } from "./Pages/Cart/Cart";
import { SignUpPage } from "./Pages/Signup/Signuppage";
import { Login } from "./Pages/Login/Login";
import { Forgetpass } from "./Pages/Forgetpass/Forgetpass";
import { Changepass } from "./Pages/Changepasspage/Changepass";
import { ProductPage } from "./Pages/Productdetails/Productdetails";
import { AddressForm } from "./Pages/Addresspage/AddressForm";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./Pages/profile/Profile";
import CheckoutPage from "./Pages/Cart/CheckOut";
import AdminLogin from "./admin/component/auth/Login";
import { useState } from "react";
import Dashboard from "./admin/dashboard/Dashboard";
import "./app.scss";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const Header1 = () => {
    const location = useLocation();

    return location.pathname === "/login" ||
      location.pathname === "/changepassword" ||
      location.pathname === "/forgot" ||
      location.pathname === "/question" ||
      location.pathname === "/signup" ||
      location.pathname === "/admin" ||
      location.pathname === "/admin-login" ? (
      <Header visible={false} />
    ) : (
      <Header visible={true} />
    );
  };

  return (
    <div className="root">
      <Header1 />
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/question"
          element={
            <PageTransition>
              <QuestionnairePage />
            </PageTransition>
          }
        />
        <Route
          path="/cart"
          element={
            <PageTransition>
              <CartPage />
            </PageTransition>
          }
        />
        <Route
          path="/products"
          element={
            <PageTransition>
              <Allproduct />
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <SignUpPage />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />
        <Route
          path="/profile"
          element={
            <PageTransition>
              <ProfilePage />
            </PageTransition>
          }
        />
        <Route
          path="/forgot"
          element={
            <PageTransition>
              <Forgetpass />
            </PageTransition>
          }
        />
        <Route
          path="/changepassword"
          element={
            <PageTransition>
              <Changepass />
            </PageTransition>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PageTransition>
              <ProductPage />
            </PageTransition>
          }
        />
        <Route
          path="/addressform"
          element={
            <PageTransition>
              <AddressForm />
            </PageTransition>
          }
        />
        <Route
          path="/checkout"
          element={
            <PageTransition>
              <CheckoutPage />
            </PageTransition>
          }
        />
          <Route
            path="/admin"
            element={
              <PageTransition>
                <Dashboard setIsAuthenticated={setIsAuthenticated} />
              </PageTransition>
            }
          />
          <Route
            path="/admin-login"
            element={
              <PageTransition>
                <AdminLogin setIsAuthenticated={setIsAuthenticated} />
              </PageTransition>
            }
          />
      </Routes>
    </div>
  );
}

export default App;

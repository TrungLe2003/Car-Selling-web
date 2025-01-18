//library
import { Route, Routes } from "react-router-dom";
// component
import Footer from "./components/footer";
import Header from "./components/header";
import AdminPage from "./components/adminPage";
import AdminOverview from "./components/adminPage/adminOverview";
import AdminUsers from "./components/adminPage/adminUsers";
import AdminCars from "./components/adminPage/adminCars";
import AdminNews from "./components/adminPage/adminNews";
import AdminComments from "./components/adminPage/adminComments";
import TotalNews from "./components/adminPage/adminNews/totalNews";
import AddNews from "./components/adminPage/adminNews/addNews";
import NotFoundPage from "./components/notFoundPage";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import ProfilePage from "./components/profilePage";
import HomePage from "./components/homePage";
import IntroducePage from "./components/introducePage";
import ContactPage from "./components/contactPage";
import CategoryPage from "./components/categoryPage";
import NewsDetailPage from "./components/newsDetailsPage";
import NewsPage from "./components/newsPage";
import NewsOverview from "./components/newsPage/newsOverview";
import NewsCarNews from "./components/newsPage/newsCarNews";
import NewsMarketNews from "./components/newsPage/newsMarketNews";
import NewsExploreCars from "./components/newsPage/newsExploreCars";
import CarDetailPage from "./components/carPage";
import SearchPage from "./components/searchPage";
//
import "./App.css";

function App() {
  return (
    <div className="container">
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route path="" element={<AdminOverview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="cars" element={<AdminCars />} />
            <Route path="news" element={<AdminNews />} >
              <Route path="" element={<TotalNews/>}/>
              <Route path="addNews" element={<AddNews/>}/>
            </Route>
            <Route path="comments" element={<AdminComments />} />
          </Route>
          <Route path="/car/:idCar" element={<CarDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/news/details" element={<NewsDetailPage />} />
          <Route path="/news" element={<NewsPage />}>
            <Route path="" element={<NewsOverview/>}/>
            <Route path="carNews" element={<NewsCarNews/>}/>
            <Route path="marketNews" element={<NewsMarketNews/>}/>
            <Route path="exploreCars" element={<NewsExploreCars/>}/>
          </Route>
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/introduce" element={<IntroducePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

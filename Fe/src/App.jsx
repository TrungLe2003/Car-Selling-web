//library
import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import { message } from "antd";
import { useEffect } from "react";
// component
import Footer from "./components/footer";
import Header from "./components/header";
import AdminPage from "./components/adminPage";
import AdminOverview from "./components/adminPage/adminOverview";
import AdminUsers from "./components/adminPage/adminUsers";
import AdminCars from "./components/adminPage/adminCars";
import AdminNews from "./components/adminPage/adminNews";
import AdminComments from "./components/adminPage/adminComments";
import ListNews from "./components/adminPage/adminNews/listNews";
import CreateNews from "./components/adminPage/adminNews/CreateEdit/createNews";
import EditNews from "./components/adminPage/adminNews/CreateEdit/editNews";
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
import NewsByCategory from "./components/newsPage/newsByCategory";
// import PageWithAllCar from "./components/categoryPage/PageWithAllCar";
// import PageWithCarByBrand from "./components/categoryPage/PageWithCarByBrand";
import CarDetailPage from "./components/carPage";
//provider
import PostingCarInfoPage from "./components/postingCarInfoPage";
import ProviderPage from "./components/providerPage";
import PostManage from "./components/providerPage/postManage";
import ContactMailManage from "./components/providerPage/contactMailProvider";
//
import SearchPage from "./components/searchPage";
import MailPage from "./components/profilePage/addToProfilePage/UserMail";
//
import "./App.css";
const socket = io("http://localhost:8080"); // Kết nối đến server

function App() {
  useEffect(() => {
    const crrUser = localStorage.getItem("currentUser");
    if (crrUser) {
      const userObj = JSON.parse(crrUser);
      const userId = userObj._id;
      socket.emit("join_room", userId); // Tham gia phòng

      // Đăng ký sự kiện một lần duy nhất
      const handleMailStatusChanged = (data) => {
        console.log("📩 Cập nhật mới từ server:", data);
        message.success(data.message);
      };
      socket.on("mailStatusChanged", handleMailStatusChanged);

      // Hủy lắng nghe sự kiện khi component unmount
      return () => {
        socket.off("mailStatusChanged", handleMailStatusChanged);
      };
    }
  }, []);

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
            <Route path="news" element={<AdminNews />}>
              <Route path=":isStatus" element={<ListNews />} />
              <Route path="createNews" element={<CreateNews />} />
              <Route path="editNews/:id" element={<EditNews />} />
            </Route>
            <Route path="comments" element={<AdminComments />} />
          </Route>
          <Route path="/provider/:idUser" element={<ProviderPage />}>
            <Route path="postmanage" element={<PostManage />}></Route>
            <Route
              path="mailContactManage"
              element={<ContactMailManage />}
            ></Route>
          </Route>
          <Route path="/car/:idCar" element={<CarDetailPage />} />
          <Route path="/postingCar" element={<PostingCarInfoPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile/:activepage/:userId"
            element={<ProfilePage />}
          />
          <Route path="/usermail/:userId" element={<MailPage />} />
          {/* Thêm cái này vào phần profile user */}
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/allCars" element={<CategoryPage />}></Route>
          <Route path="/news/details/:id" element={<NewsDetailPage />} />
          <Route path="/news" element={<NewsPage />}>
            <Route path="" element={<NewsOverview />} />
            <Route path=":isCategory" element={<NewsByCategory />} />
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

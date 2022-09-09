import './App.css';
import {GuestPage} from "./components/GuestPage/GuestPage";
import {Routes, Route} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<GuestPage/>} />
            <Route path="/profile" element={<Profile/>} />
        </Routes>
    </div>
  );
}

export default App;


// artemTestovoe@gmail.ru

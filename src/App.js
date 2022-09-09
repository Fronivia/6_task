import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import {Profile} from "./components/Profile/Profile";
import Question from "./components/Question/Question";
import Result from "./components/Result/Result";
import HardQuestion from "./components/HardQuestions/HardQuestion";
import Authorization from "./components/Authorization/Authorization";
import {Registration} from "./components/Registration/Registration";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Registration/>}/>
                <Route path="/authorization" element={<Authorization/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/question" element={<Question/>}/>
                <Route path="/result" element={<Result/>}/>
                <Route path='/hard_question' element={<HardQuestion/>}/>
                <Route path="*" element={<Navigate to='/authorization' replace/>}/>
            </Routes>
        </div>
    );
}

export default App;

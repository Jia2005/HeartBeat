import { HashRouter, Route, Routes } from "react-router-dom";
import Question from "./Pages/Question";
import Happy from "./Pages/Happy";
import Sad from "./Pages/Sad";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Question />} />
        <Route path="/happy" element={<Happy />} />
        <Route path="/sad" element={<Sad />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
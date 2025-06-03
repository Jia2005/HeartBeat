import { HashRouter, Route, Routes } from "react-router-dom";
import Question from "./Pages/Question";
import Happy from "./Pages/Happy";
import Sad from "./Pages/Sad";
import PreHappy from "./Pages/PreHappy";
import PreSad from "./Pages/PreSad";
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Question />} />
        <Route path="/prehappy" element={<PreHappy />} />
        <Route path="/happy" element={<Happy />} />
        <Route path="/presad" element={<PreSad />} />
        <Route path="/sad" element={<Sad />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
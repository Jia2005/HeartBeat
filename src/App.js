import { HashRouter, Route, Routes } from "react-router-dom";
import Question from "./Pages/Question";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Question />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
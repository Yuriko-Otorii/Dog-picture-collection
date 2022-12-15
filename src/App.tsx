import "./App.css";
import Navigation from "./Components/Navigation";
import MainRoter from "./Router/MainRoter";
import { ConfigProvider } from "antd"


function App() {
  return (

    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "'Fuzzy Bubbles', cursive",
          },
        }}
      >
        <MainRoter />
        {/* <Navigation /> */}
      </ConfigProvider>
    </div>
  );
}

export default App;

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Register } from "./pages/Register";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Register} />
          </Switch>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;

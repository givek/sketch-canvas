import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <AuthProvider>
          <Router>
            <Switch>
              <Route path="/" exact component={Register} />{" "}
              <Route path="/login" exact component={Login} />
            </Switch>
          </Router>
        </AuthProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;

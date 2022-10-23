import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Boards from "./pages/Boards";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { CanvasProvider } from "./contexts/CanvasContext";
import Sketch from "./pages/Sketch";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Router>
              <Switch>
                <Route path="/" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <PrivateRoute path="/sketches" exact component={Boards} />
                <CanvasProvider>
                  <PrivateRoute
                    path="/sketches/:sketchId"
                    exact
                    component={Sketch}
                  />
                </CanvasProvider>
              </Switch>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;

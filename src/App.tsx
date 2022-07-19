import "./App.css";

import { ChakraProvider, Container } from "@chakra-ui/react";
import TableComponent from "./components/Container/TableComponent";
import { Provider } from "react-redux";
import { store } from "./state/store";

const App = () => {
  // const header = ['日付', '分類', '内容', '金額', '収入/支出']
  return (
    <ChakraProvider>
      <Provider store={store}>
        <div className="App">
          <Container maxW="1000px" minW="800px">
            <TableComponent />
          </Container>
        </div>
      </Provider>
    </ChakraProvider>
  );
};

export default App;

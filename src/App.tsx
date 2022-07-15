import "./App.css";

import { Container } from "@chakra-ui/react";
import TableComponent from "./components/TableComponent";

const App = () => {
  // const header = ['日付', '分類', '内容', '金額', '収入/支出']
  return (
    <div className="App">
      <Container maxW="1000px" minW="800px">
        <TableComponent />
      </Container>
    </div>
  );
}

export default App;

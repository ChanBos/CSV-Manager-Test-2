// Imported React library.
import React from "react";
// Imported stylesheet.
import "./App.css";
// Imported components from React Bootstrap.
import { Row, Col } from "react-bootstrap";
// Imported components.
import ExportCSV from "./components/ExportCSV";
import ImportCSV from "./components/ImportCSV";

/**
 * Created the App function and returning components to be exported to index.js.
 * Added the React Bootstrap link.
 * @returns Application that returns all of the components.
 */

const App = () => {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossOrigin="anonymous"
      ></link>
      <Row>
        <h1>CSV Report Manager</h1>
      </Row>
      <Row>
        <Col>
          <ExportCSV />
        </Col>
        <Col>
          <ImportCSV />
        </Col>
      </Row>
    </div>
  );
};

// Exporting App.js to index.js.
export default App;

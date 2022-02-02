// Imported React library..
import React, { useState } from "react";
// Imported Form from React Bootstrap.
import { Form, Row, Button } from "react-bootstrap";

/**
 * Created a function that allows the user to import a CSV file.
 * Set the initial state of the CSV data.
 * Created a function that will render the CSV data and send the file to the server ("output folder").
 * If successful, alert the user that the file has been uploaded. If not, the user will be alerted that the file failed to upload.
 * Created a function that will store the CSV data in the state.
 * @returns A form input area to upload a CSV file and a table to display the data.
 */

const ImportCSV = () => {
  const [csv, setCsv] = useState("");

  const csvSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("file", csv.data);

    const response = fetch("http://localhost:8080/csv/download", {
      method: "POST",
      body: formData,
    });
    if (response) {
      alert("File Uploaded Successfully");
    } else {
      alert("File Upload Failed");
    }
  };

  const csvInput = (e) => {
    const csvFile = {
      data: e.target.files[0],
    };
    setCsv(csvFile);
  };

  return (
    <div>
      <Row>
        <Form id="import-form" onSubmit={csvSubmit}>
          <Form.Label>Upload CSV File</Form.Label>
          <Form.Control type="file" name="file" onChange={csvInput} />
          <Button type="submit" className="form-btn">
            Import CSV
          </Button>
        </Form>
      </Row>
    </div>
  );
};

// Exporting ImportCSV.js to App.js.
export default ImportCSV;

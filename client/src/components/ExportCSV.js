// Imported React library.
import React, { useState } from "react";
// Imported components from React Bootstrap.
import { Form, Button } from "react-bootstrap";
// Imported Moment library.
import moment from "moment";
// Imported Axios library.
import axios from "axios";
import { usePapaParse } from "react-papaparse";
// Imported Moment Random library.
const momentRandom = require("moment-random");
// Imported UniqueNamesGenerator library.
const { uniqueNamesGenerator } = require("unique-names-generator");

/**
 * Created a function that will render the ExportCSV component.
 * @returns Form and CSVLink components that allows for the rendering of the functions in the ExportCSV component.
 */

const ExportCSV = () => {
  const [amount, setAmount] = useState("");
  const [renderAmount, setRenderAmount] = useState("");
  const [csv, setCsv] = useState("");
  const [show, setShow] = useState(false);

  // Created a function that will set the amount of data to be rendered.
  const handleAmountReq = (e) => {
    const amount = e.target.value;
    setAmount(amount);
  };

  // Created a function that will show the "Export" button.
  const toggle = () => {
    setShow((wasShow) => !wasShow);
  };

  // Created a function that will render the amount of data requested.
  const handleAmount = (e) => {
    e.preventDefault();

    const renderAmount = amount;
    setRenderAmount(renderAmount);
    toggle();
    setAmount("");
  };

  // Created headers for the CSV file and allocated keys to each column.
  const headers = [
    { label: "Id", key: "id" },
    { label: "Name", key: "name" },
    { label: "Surname", key: "surname" },
    { label: "Initials", key: "initials" },
    { label: "Age", key: "age" },
    { label: "DateOfBirth", key: "dateofbirth" },
  ];

  // Created an array of 20 names.
  const names = [
    "John",
    "Jane",
    "Joe",
    "Jack",
    "Jill",
    "Jenny",
    "Chanelle",
    "Andre",
    "Ruth",
    "Sally",
    "Sue",
    "Ross",
    "Rachel",
    "Samantha",
    "Sophie",
    "Tyron",
    "Shane",
    "Trevor",
    "Travis",
    "Tyson",
  ];

  // Utilized the uniqueNamesGenerator library to generate a random name. Used the user input value to deduct the amount of existing name data
  // to get the correct amount of data. New array is created.
  const randomName = Array.from({ length: renderAmount - names.length }, () =>
    uniqueNamesGenerator({ dictionaries: [names] })
  );

  // Concatenated the names array with the randomName array to return the complete array of names.
  const newName = names.concat(randomName);

  // Created an array of 20 surnames.
  const surnames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
    "Bosiger",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
    "Martinez",
    "Robinson",
  ];

  // Utilized the uniqueNamesGenerator library to generate a random surname. Used the user input value to deduct the amount of existing
  // surname data to get the correct amount of data. New array is created.
  const randomSurname = Array.from(
    { length: renderAmount - surnames.length },
    () =>
      uniqueNamesGenerator({
        dictionaries: [names],
      })
  );

  // Concatenated the surnames array with the randomSurname array to return the complete array of surnames.
  const newSurname = surnames.concat(randomSurname);

  // Generating id based on the the user input value. Utilizing the index (+ 1) to generate the id.
  const id = Array.from({ length: renderAmount }, (_, i) => i + 1);

  // Generating initials from newName array. Targeting [0] index of the newName array.
  const initials = newName.map((entry) => entry[0]);

  // Using the user input value to generate random age. Utilizing Math.floor to round down to nearest whole number and Math.random
  // to generate a random number. Assuming that the age will be between 1 and 100.
  const ages = Array.from({ length: renderAmount }, () =>
    Math.floor(Math.random() * 100)
  );

  // Using the user input value to generate random day of birth.
  const randomDayArray = Array.from({ length: renderAmount }, () =>
    momentRandom().format("DD")
  );
  // Using the user input value to generate random month of birth.
  const randomMonthArray = Array.from({ length: renderAmount }, () =>
    momentRandom().format("MM")
  );

  // Getting current year.
  const yearNow = moment().format("YYYY");

  // Using the user input value to generate random year of birth array.
  const yearNowArray = Array.from({ length: renderAmount }, () => yearNow);

  // Deducting the random age array from the yearNow array to generate the date of birth array.
  const yearCalcArray = yearNowArray.map(
    (yearNowValue, yearNowIndex) => yearNowValue - ages[yearNowIndex]
  );

  // Concatenating the random day, month and year to generate the date of birth array.
  const dateOfBirth = randomDayArray.map(
    (randomDayValue, randomDayIndex) =>
      randomDayValue +
      "/" +
      randomMonthArray[randomDayIndex] +
      "/" +
      yearCalcArray[randomDayIndex]
  );

  // Created main data array that contains all of the data. The data array will be used to generate the CSV file.
  const data = id.map((id, index) => {
    return {
      id: id,
      name: newName[index],
      surname: newSurname[index],
      initials: initials[index],
      age: ages[index],
      dateofbirth: dateOfBirth[index],
    };
  });

  const { jsonToCSV } = usePapaParse();

  const exportCSV = async (e) => {
    e.preventDefault();

    const results = jsonToCSV({ headers, data });
    setCsv(results);
    console.log(results);

    let formData = new FormData();
    formData.append("file", csv.data);

    const response = await axios({
      url: "http://localhost:8080/csv/download",
      method: "post",
      body: formData,
    });
    if (response) {
      alert("File Uploaded Successfully");
    } else {
      alert("File Upload Failed");
    }
    console.log(formData);
  };

  return (
    <div>
      <Form id="export-form">
        <Form.Group>
          <Form.Label>Generate CSV File</Form.Label>
          <Form.Control
            placeholder="Enter Amount of Records Needed"
            value={amount}
            onChange={(e) => handleAmountReq(e)}
          />
        </Form.Group>
        <Button className="form-btn" onClick={handleAmount}>
          Generate Data
        </Button>
        {show && (
          <Button
            className="form-btn"
            type="submit"
            onClick={(e) => exportCSV(e)}
          >
            Export CSV
          </Button>
        )}
      </Form>
    </div>
  );
};

// Exporting ExportCSV to App.js.
export default ExportCSV;

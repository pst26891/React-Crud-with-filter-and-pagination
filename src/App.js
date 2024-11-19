import logo from "./logo.svg";
import "./App.css";
import Pagination from "./components/Pagination";
import { FakeUserData } from "./components/FakeUserData";
import { useEffect, useState } from "react";
import HtmlForm from "./components/HtmlForm";
import DeleteAlert from "./components/DeleteAlert";

function App() {
  const [totalEntries, setTotalEntries] = useState(null); // Example total entries
  const [itemsPerPage] = useState(2); // Example number of items per page
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  const [FakeUserDataNew, setFakeUserData] = useState([]);
  const [originalFakeUserData, setOriginalFakeUserData] = useState([]); // Original unfiltered data

  const [selectedItemId, setSelectedItemId] = useState(null);
  const [checkedItemId, setCheckedItemId] = useState([]);

  const [username, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [submitButton, setSubmitButtonName] = useState("Add");

  useEffect(() => {
    setFakeUserData(FakeUserData);
    setOriginalFakeUserData(FakeUserData); // Set original data
  }, []);

  useEffect(() => {
    setTotalEntries(FakeUserDataNew.length);
  });

  const deleteData = (id) => {
    if (id) {
      const removalFakeData = FakeUserDataNew.filter((item) => item.id !== id);
      setFakeUserData(removalFakeData);
      setSelectedItemId(null);
    } else {
      const removalFakeData = FakeUserDataNew.filter(
        (item) => !checkedItemId.includes(item.id)
      );
      setFakeUserData(removalFakeData);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
  };

  const handleSave = (id) => {
    const updateDataRow = FakeUserDataNew.filter((item) => item.id == id);
    setSubmitButtonName("Update");
    setName(updateDataRow[0].name);
    setEmail(updateDataRow[0].email);
    setAddress(updateDataRow[0].address);
    setPhone(updateDataRow[0].phone);

    setSelectedItemId(id);
    alert(totalEntries);
  };

  const handleUpdate = (selectedItemId) => {
    const updatedFakeUserData = [...FakeUserDataNew];

    const index = updatedFakeUserData
      .map((item) => {
        return item.id;
      })
      .indexOf(selectedItemId);

    updatedFakeUserData[index].name = username;
    updatedFakeUserData[index].email = email;
    updatedFakeUserData[index].address = address;
    updatedFakeUserData[index].phone = phone;

    setFakeUserData(updatedFakeUserData);
  };

  const handleAdd = (e) => {
    e.preventDefault(); // Prevents default behavior, if needed

    const data = [...FakeUserDataNew];
    const newElement = {
      id: data.length + 1,
      name: username,
      email: email,
      address: address,
      phone: phone,
    };

    console.log(newElement);
    data.push(newElement);
    console.log(data);
    setFakeUserData(data);
  };

  const handleClear = () => {
    setName("");
    setEmail("");
    setAddress("");
    setPhone("");
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setCheckedItemId((prevState) => [...prevState, id]);
    } else {
      setCheckedItemId((prevState) => prevState.filter((item) => item !== id));
    }
  };

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      // Select all checkboxes: we assume that the ids are from 1 to N based on your data.
      // If your FakeUserDataNew contains a dynamic list of users, use their length or IDs.
      const allIds = FakeUserDataNew.map((item) => item.id);
      setCheckedItemId(allIds);
    } else {
      // Deselect all checkboxes
      setCheckedItemId([]);
    }
  };

  // Paginate the data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = FakeUserDataNew.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle page click
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  // Handle page click
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Handle "Previous" button click
  const handlePrevClick = () => {
    console.log(FakeUserDataNew);
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle "Next" button click
  const handleNextClick = () => {
    console.log(FakeUserDataNew);
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

 // Handle search input change
 const handleSearch = (searchTerm) => {
  if (searchTerm) {
    // Filter the user data based on search term
    const filteredData = originalFakeUserData.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFakeUserData(filteredData); // Update displayed data
  } else {
    // If search term is cleared, reset to original data
    setFakeUserData(originalFakeUserData);
  }
};

  return (
    <>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-8">
                 <div className="col-sm-6 float-left">
                  <h2>
                    Manage <b>Employees</b>
                  </h2>
                  </div>
                  <div className="col-sm-6 float-left">
                  <div className="form-group d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search employees..."
                      onChange={(e) => handleSearch(e.target.value)} // Function to handle search input change
                    />
                  </div>
                  </div>


                </div>
                <div className="col-sm-4">
                  <a
                    href="#addEmployeeModal"
                    className="btn btn-success"
                    data-toggle="modal"
                    onClick={(e) => {
                      setSubmitButtonName("Add");
                      handleClear();
                    }}
                  >
                    <i className="material-icons">&#xE147;</i>{" "}
                    <span>Add New Employee</span>
                  </a>
                  <a
                    href="#deleteEmployeeModal"
                    className="btn btn-danger"
                    data-toggle="modal"
                  >
                    <i className="material-icons">&#xE15C;</i>{" "}
                    <span>Delete</span>
                  </a>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    <span className="custom-checkbox">
                      <input
                        type="checkbox"
                        id="selectAll"
                        checked={
                          checkedItemId.length === FakeUserDataNew.length
                        }
                        onChange={handleSelectAllChange}
                      />
                      <label htmlFor="selectAll"></label>
                    </span>
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <span className="custom-checkbox">
                          <input
                            type="checkbox"
                            id="checkbox1"
                            name="options[]"
                            value={item.id}
                            checked={checkedItemId.includes(item.id)}
                            onChange={(e) => handleCheckboxChange(e, item.id)}
                          />
                          <label htmlFor="checkbox1"></label>
                        </span>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>{item.phone}</td>
                      <td>
                        <a
                          href="#addEmployeeModal"
                          className="edit"
                          onClick={() => handleSave(item.id)}
                          data-toggle="modal"
                        >
                          <i
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Edit"
                          >
                            &#xE254;
                          </i>
                        </a>
                        <a
                          href="#deleteEmployeeModal"
                          className="delete"
                          onClick={() => handleDeleteClick(item.id)}
                          data-toggle="modal"
                        >
                          <i
                            className="material-icons"
                            data-toggle="tooltip"
                            title="Delete"
                          >
                            &#xE872;
                          </i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              totalEntries={totalEntries}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              handleNextClick={handleNextClick}
              totalPages={totalPages}
              handlePageClick={handlePageClick}
              handlePrevClick={handlePrevClick}
            />
          </div>
        </div>
        <HtmlForm
          username={username}
          email={email}
          phone={phone}
          address={address}
          handleSave={handleSave}
          setName={setName}
          setEmail={setEmail}
          setAddress={setAddress}
          setPhone={setPhone}
          handleUpdate={handleUpdate}
          submitButton={submitButton}
          selectedItemId={selectedItemId}
          handleAdd={handleAdd}
        />
        <DeleteAlert deleteData={deleteData} itemId={selectedItemId} />
      </div>
    </>
  );
}

export default App;

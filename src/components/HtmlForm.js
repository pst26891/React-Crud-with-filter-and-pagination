import React from "react";

export default function HtmlForm({
  username,
  email,
  phone,
  address,
  handleSave,
  setName,
  setEmail,
  setAddress,
  setPhone,
  handleUpdate,
  submitButton,
  selectedItemId,
  handleAdd
}) {
  return (
    <div>
      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form>
              <div className="modal-header">
                <h4 className="modal-title">Add Employee</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={username}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                  value="Cancel"
                />
                <input
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  value={submitButton}
                  onClick={(e) => {
                    if (submitButton === "Add") {
                      handleAdd(e); // Trigger handleAdd when the button value is "Add"
                    } else if (submitButton === "Update") {
                      handleUpdate(selectedItemId); // Trigger handleUpdate when the button value is "Update"
                    }
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

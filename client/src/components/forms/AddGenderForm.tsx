const AddGenderform = () => {
  return (
    <>
      <div className="form-group">
        <div className="mb-3">
          <label htmlFor="gender">Gender</label>
          <input
            type="text"
            className="form-control"
            id="gedner"
            name="gender"
          />
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AddGenderform;

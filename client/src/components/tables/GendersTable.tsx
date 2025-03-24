const GendersTable = () => {
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr className="align-middle">
            <th>No.</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="align-middle">
            <td>1</td>
            <td>Male</td>
            <td>
              <div className="btn-group">
                <button type="button" className="btn btn-success">
                  Edit
                </button>
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr className="align-middle">
            <td>2</td>
            <td>Female</td>
            <td>
              <div className="btn-group">
                <button type="button" className="btn btn-success">
                  Edit
                </button>
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr className="align-middle">
            <td>3</td>
            <td>Others</td>
            <td>
              <div className="btn-group">
                <button type="button" className="btn btn-success">
                  Edit
                </button>
                <button type="button" className="btn btn-danger">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GendersTable;

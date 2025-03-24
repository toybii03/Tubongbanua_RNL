import AddGenderform from "../../components/forms/AddGenderForm";
import Genderstable from "../../components/tables/GendersTable";
import MainLayout from "../layout/MainLayout";

const Genders = () => {
  const content = (
    <>
      <div className="row">
        <div className="col-md-4">
          <AddGenderform />
        </div>
        <div className="col-md-8">
          <Genderstable />
        </div>
      </div>
    </>
  );

  return <MainLayout content={content} />;
};

export default Genders;

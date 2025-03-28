import { useState } from "react";
import ALertMessage from "../../components/ALertMessage";
import AddGenderform from "../../components/forms/AddGenderForm";
import Genderstable from "../../components/tables/GendersTable";
import MainLayout from "../layout/MainLayout";

const Genders = () => {
  const [refreshGenders, setRefreshGenders] = useState(false);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleShowAlertMessage = (
    messsage: string,
    isSuccess: boolean,
    isVisible: boolean
  ) => {
    setMessage(messsage);
    setIsSuccess(isSuccess);
    setIsVisible(isVisible);
  };

  const handleCloseAlertMessage = () => {
    setMessage("");
    setIsSuccess(false);
    setIsVisible(false);
  };

  const content = (
    <>
      <ALertMessage
        message={message}
        isSuccess={isSuccess}
        isVisible={isVisible}
        onClose={handleCloseAlertMessage}
      />
      <div className="row">
        <div className="col-md-4">
          <AddGenderform
            onGenderAdded={(message) => {
              handleShowAlertMessage(message, true, true);
              setRefreshGenders(!refreshGenders);
            }}
          />
        </div>
        <div className="col-md-8">
          <Genderstable refreshGenders={refreshGenders} />
        </div>
      </div>
    </>
  );

  return <MainLayout content={content} />;
};

export default Genders;

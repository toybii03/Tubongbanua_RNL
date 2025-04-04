import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import ErrorHandler from "../../../handler/ErrorHandler";
import GenderService from "../../../services/GenderService";
import Genders from "../../../interfaces/Genders";
import UserFieldErrors from "../../../interfaces/UserFieldErrors";
import UserService from "../../../services/UserService";

interface AddUserFormProps {
  setSubmitForm: React.MutableRefObject<(() => void) | null>;
  setLoadingStore: (loading: boolean) => void;
  onUserAdded: (message: string) => void;
}

const AddUserForm = ({
  setSubmitForm,
  setLoadingStore,
  onUserAdded,
}: AddUserFormProps) => {
  const [state, setState] = useState({
    loadingGenders: true,
    genders: [] as Genders[],
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix_name: "",
    birth_date: "",
    gender: "",
    address: "",
    contact_number: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: {} as UserFieldErrors,
  });

  const handleResetNecessaryFields = () => {
    setState((prevState) => ({
      ...prevState,
      first_name: "",
      middle_name: "",
      last_name: "",
      suffix_name: "",
      birth_date: "",
      gender: "",
      address: "",
      contact_number: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: {} as UserFieldErrors,
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoadGenders = () => {
    GenderService.loadGenders()
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            genders: res.data.genders,
          }));
        } else {
          console.error(
            "Unexpected status error while loading genders: ",
            res.status
          );
        }
      })
      .catch((error) => {
        ErrorHandler(error, null);
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingGenders: false,
        }));
      });
  };

  const handleStoreUser = (e: FormEvent) => {
    e.preventDefault();

    setLoadingStore(true);

    UserService.storeUser(state)
      .then((res) => {
        if (res.status === 200) {
          handleResetNecessaryFields();
          onUserAdded(res.data.message);
        } else {
          console.error(
            "Unexpected status error while storing user: ",
            res.status
          );
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors,
          }));
        } else {
          ErrorHandler(error, null);
        }
      })
      .finally(() => {
        setLoadingStore(false);
      });
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    handleLoadGenders();

    setSubmitForm.current = () => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    };
  }, [setSubmitForm]);

  return (
    <>
      <form ref={formRef} onSubmit={handleStoreUser}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.first_name ? "is-invalid" : ""
                }`}
                name="first_name"
                id="first_name"
                value={state.first_name}
                onChange={handleInputChange}
              />
              {state.errors.first_name && (
                <span className="text-danger">
                  {state.errors.first_name[0]}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="middle_name">Middle Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.middle_name ? "is-invalid" : ""
                }`}
                name="middle_name"
                id="middle_name"
                value={state.middle_name}
                onChange={handleInputChange}
              />
              {state.errors.middle_name && (
                <span className="text-danger">
                  {state.errors.middle_name[0]}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.last_name ? "is-invalid" : ""
                }`}
                name="last_name"
                id="last_name"
                value={state.last_name}
                onChange={handleInputChange}
              />
              {state.errors.last_name && (
                <span className="text-danger">{state.errors.last_name[0]}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="suffix_name">Suffix Name</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.suffix_name ? "is-invalid" : ""
                }`}
                name="suffix_name"
                id="suffix_name"
                value={state.suffix_name}
                onChange={handleInputChange}
              />
              {state.errors.suffix_name && (
                <span className="text-danger">
                  {state.errors.suffix_name[0]}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="birth_date">Birth Date</label>
              <input
                type="date"
                className={`form-control ${
                  state.errors.birth_date ? "is-invalid" : ""
                }`}
                name="birth_date"
                id="birth_date"
                value={state.birth_date}
                onChange={handleInputChange}
              />
              {state.errors.birth_date && (
                <span className="text-danger">
                  {state.errors.birth_date && (
                    <span className="text-danger">
                      {state.errors.birth_date[0]}
                    </span>
                  )}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="gender">Gender</label>
              <select
                className={`form-select ${
                  state.errors.gender ? "is-invalid" : ""
                }`}
                name="gender"
                id="gender"
                value={state.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                {state.loadingGenders ? (
                  <option value="">Loading...</option>
                ) : (
                  state.genders.map((gender, index) => (
                    <option value={gender.gender_id} key={index}>
                      {gender.gender}
                    </option>
                  ))
                )}
              </select>
              {state.errors.gender && (
                <span className="text-danger">{state.errors.gender[0]}</span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.address ? "is-invalid" : ""
                }`}
                name="address"
                id="address"
                value={state.address}
                onChange={handleInputChange}
              />
              {state.errors.address && (
                <span className="text-danger">{state.errors.address[0]}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="contact_number">Contact Number</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.contact_number ? "is-invalid" : ""
                }`}
                name="contact_number"
                id="contact_number"
                value={state.contact_number}
                onChange={handleInputChange}
              />
              {state.errors.contact_number && (
                <span className="text-danger">
                  {state.errors.contact_number[0]}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className={`form-control ${
                  state.errors.email ? "is-invalid" : ""
                }`}
                name="email"
                id="email"
                value={state.email}
                onChange={handleInputChange}
              />
              {state.errors.email && (
                <span className="text-danger">{state.errors.email[0]}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${
                  state.errors.password ? "is-invalid" : ""
                }`}
                name="password"
                id="password"
                value={state.password}
                onChange={handleInputChange}
              />
              {state.errors.password && (
                <span className="text-danger">{state.errors.password[0]}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password_confirmation">
                Password Confirmation
              </label>
              <input
                type="password"
                className={`form-control ${
                  state.errors.password_confirmation ? "is-invalid" : ""
                }`}
                name="password_confirmation"
                id="password_confirmation"
                value={state.password_confirmation}
                onChange={handleInputChange}
              />
              {state.errors.password_confirmation && (
                <span className="text-danger">
                  {state.errors.password_confirmation[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddUserForm;

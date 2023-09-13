import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import PageHeader from "../../Shared/Template/PageHeader";
import UserForm from "./UserForm";
import PasswordForm from "./PasswordForm";
import ImageUploader from "./ImageUploader";

const EditUser = () => {
  const { currentUser, accessToken } = useSelector(
    (store: RootState) => store.sessions
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <PageHeader title="Configurações" />

        <div className="grid grid-cols-1 xl:gap-4">
          <div className="col-span-2">
            {/* picture uploader */}
            <ImageUploader
              accessToken={accessToken}
              currentUser={currentUser}
            />
            {/* user form */}
            <UserForm currentUser={currentUser} accessToken={accessToken} />
            {/* password form */}
            <PasswordForm accessToken={accessToken} />
          </div>
        </div>
      </div>
    </>
  );
};
export default EditUser;

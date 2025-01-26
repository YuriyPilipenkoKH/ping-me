import AvatarUploadFormCustom from '../components/forms/AvatarUploadForm.custom';
import AvatarUploadForm from '../components/forms/AvatarUploadForm.orig';
import ProfileForm from '../components/forms/ProfileForm.orig';
import AccountInfo from '../components/profile/AccountInfo.orig';

const ProfilePage = () => {


  return (
     <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* <AvatarUploadForm /> */}
          <AvatarUploadFormCustom />
          <ProfileForm  />
          <AccountInfo/>
        </div>
      </div>
    </div>
  );
  
}

export default ProfilePage
import ProfileDetailsLeftPanel from './ProfileDetailsLeftPanel';
import ProfileDetailsRightPanel from './ProfileDetailsRightPanel';

const ProfileDetailsSection = ({ portfolio }) => (
  <section className='mt-4 grid gap-5 lg:grid-cols-2'>
    <ProfileDetailsLeftPanel portfolio={portfolio} />
    <ProfileDetailsRightPanel />
  </section>
);

export default ProfileDetailsSection;

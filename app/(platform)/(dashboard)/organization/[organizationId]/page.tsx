import { OrganizationSwitcher, auth } from '@clerk/nextjs';

const OrganizationIdPage = () => {
  const { userId, orgId } = auth();
  return (
    <div>
      {/* <OrganizationSwitcher hidePersonal /> */}
      Organization Page
    </div>
  );
};

export default OrganizationIdPage;

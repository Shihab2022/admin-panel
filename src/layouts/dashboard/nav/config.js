// component
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ApiIcon from '@mui/icons-material/Api';
import LockResetIcon from '@mui/icons-material/LockReset';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Organizations',
    path: '/dashboard/organizations',
    icon: <CorporateFareIcon/>,
  },
  {
    title: 'User',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },

  {
    title: 'Api keys',
    path: '/dashboard/keys',
    icon: <ApiIcon/>,
  },
  {
    title: 'Super Admin',
    path: '/dashboard/superAdmin',
    icon: <AdminPanelSettingsIcon/>,
  },
  {
    title: 'Change Password',
    path: '/dashboard/updatePassword',
    icon: <LockResetIcon/>,
  },
];

export default navConfig;

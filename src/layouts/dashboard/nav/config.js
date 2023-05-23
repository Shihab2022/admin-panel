// component
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
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Organizations',
    path: '/dashboard/organizations',
    icon: icon('ic_blog'),
  },
  {
    title: 'Api keys',
    path: '/dashboard/keys',
    icon: icon('ic_blog'),
  },
  {
    title: 'Super Admin',
    path: '/dashboard/superAdmin',
    icon: icon('ic_blog'),
  },
  {
    title: 'Change Password',
    path: '/dashboard/updatePassword',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;

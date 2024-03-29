import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'course list',
    path: '/',
    icon: icon('ic_cart'),
  },
  {
    title: 'Add Course',
    path: '/addProduct',
    icon: icon('ic_addCart'),
  },
  {
    title: 'Student Management',
    path: '/studentManagement',
    icon: icon('ic_lock'),
  },
  {
    title: 'log out',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;

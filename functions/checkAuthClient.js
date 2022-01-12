import { useStore } from '../store';
import { useRouter } from 'next/router';

function withAuth (Component)  {
  // const router = useRouter();
  const Auth = (props) => {
    const store = useStore();
    const router = useRouter();
    if (store.accessToken !== null) {
      return <Component {...props} />;
    } else {
      // router.replace('/');
      return null;
    }
  };
  return Auth;
};

export default withAuth;

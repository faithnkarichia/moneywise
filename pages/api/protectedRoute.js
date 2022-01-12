import checkAuth from './middleware/checkAuthServer';

const protectedRoute = async (req, res) => {
  if (req.method === 'GET') {
    //secret data
    res.send("It's a GET!");
  }
};

//authentication middleware
export default checkAuth(protectedRoute);

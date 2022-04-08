import config from '../../config';

const baseUrl = config.API_BASE_URL;

const TASKIFY_API_ENDPOINT = {
  loginUser: `${baseUrl}/api/signin`,
  registerUser: `${baseUrl}/api/signup`,
  authenticateUser: `${baseUrl}/api/authenticate`,
  taskAPI: `${baseUrl}/api/tasks`
};

export default TASKIFY_API_ENDPOINT;

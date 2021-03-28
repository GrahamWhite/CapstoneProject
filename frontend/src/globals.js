

export const backendURL = "http://ec2-35-183-39-123.ca-central-1.compute.amazonaws.com:3000";

export const ReAuthenticate = (props) => {
  localStorage.setItem('username', '');
  props.history.push('/login');
}


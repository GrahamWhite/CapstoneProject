

export const backendURL = "http://ec2-35-183-39-123.ca-central-1.compute.amazonaws.com:3000";

export const ReAuthenticate = (props) => {
  localStorage.setItem('username', '');
  props.history.push('/login');
}

// Solution to persist redux states, so loggedIn state is saved
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    try {
      if (serializedState === "{\"loggedIn\":true}"){
        // console.log("success", "you did it!");
        return JSON.parse(serializedState);
      }
      else {
        return JSON.parse("{\"loggedIn\":false}");
      }
    }
    catch (e) {
      console.log("global.js loadState", "something wrong with persisting state");
    }
    
  } catch(err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch(err) {
    console.log(err);
  }
};


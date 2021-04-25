/*
 *  globals.js
 *  General functions used throughout the app.
 *  loadState and saveState are used to persist the redux state between sessions.
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

export const backendURL = "http://ec2-15-222-253-45.ca-central-1.compute.amazonaws.com:3000";
//export const backendURL = "http://localhost:3000";

export const ReAuthenticate = (props) => {
  localStorage.setItem('username', '');
  props.history.push('/login');
}

// Solution to persist redux states, so loggedIn state is saved
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    try {
      if (serializedState){
        const parsedState = JSON.parse(serializedState);
        if (parsedState.loggedIn) {
          return JSON.parse("{\"loggedIn\":true}");
        }
        else {
          return JSON.parse("{\"loggedIn\":false}");
        }
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


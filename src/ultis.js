export const getToken = () => {
  let token = localStorage.getItem("jwtToken");
  if(!token || token === "") {//if there is no token, dont bother
    return null;
  }
  return token;
}

export const fetchFromArr = (id, arr) => {
  for(var item in arr) {
    if(item._id === id) {
      return item;
    }
  }
  return null;
}

export const saveToLocalStorage = (state) => {
  console.log("saved to localstorage");
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    throw e;
  }
}

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    throw e;
  }
}
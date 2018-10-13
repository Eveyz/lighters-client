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
    return null;
  }
}
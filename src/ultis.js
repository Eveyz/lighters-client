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

export const groupBooks = (books) => {
  var groupBooks = {};

  // group books by category
  books.forEach(function(book) {
    if(!(book.category in groupBooks)) {
      groupBooks[book.category] = [];
    }
    groupBooks[book.category].push(book);
  });

  // group books by serials name
  var serialsBooks;
  for(var category in groupBooks) {
    serialsBooks = {};
    if (groupBooks.hasOwnProperty(category)) {
      groupBooks[category].forEach(function(book) {
        var serialsName = book.serials;
        if(!(serialsName in serialsBooks)) {
          serialsBooks[serialsName] = [];
        }
        serialsBooks[serialsName].push(book);
      });
      groupBooks[category] = serialsBooks;
    }
  }
  return { groupedBooks: groupBooks, categories: Object.keys(groupBooks) };
}
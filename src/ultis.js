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
      groupBooks[category].forEach((book) => {
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

export const TZDateToDate = (TZDate) => {
  let date = new Date(Date.parse(TZDate));
  return date;
}

export const getFullMinutes = (date) => {
  return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
}

export const getFullDate = (date) => {
  const [_year, _month, _day] = date.split("-")
  let month = (parseInt(_month, 10) < 10 ? '0' : '') + _month
  let day = (parseInt(_day, 10) < 10 ? '0' : '') + _day
  return `${_year}-${month}-${day}`
}

export const getToday = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();
  if(dd < 10) {
    dd = '0' + dd
  }
  if(mm < 10) {
    mm = '0' + mm
  }
  today = mm + '/' + dd + '/' + yyyy;
  return today
}

export const sortReportsByDate = (reports) => {
  if(!reports) return []
  let results = reports.sort((a, b) => b.course_date.localeCompare(a.course_date))
  return results
}

export const sortTransactionsByDate = (transactions) => {
  if(!transactions) return []
  let results = transactions.sort((b, a) => a.created_at.localeCompare(b.created_at))
  return results
}
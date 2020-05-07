import React, { useState } from 'react'
import jwtDecode from 'jwt-decode'

const AppContext = React.createContext([{}, () => {}])

const AppContextProvider = (props) => {
  const [state, setState] = useState(() => {
    var token = null
    try {
      token = sessionStorage.getItem('jwtToken')
    } catch (e) {
      throw e
    }
    if(token) {
      var user = jwtDecode(token)
      let t = parseInt(new Date().getTime()/1000)
      if(t - user.exp >= 0) return { 
        auth: false,
        current_user: null,
        current_course: null,
        current_teacher: null,
        current_student: null,
        current_report: null
      }
      return {
        auth: true,
        current_user: user,
        current_course: null,
        current_teacher: null,
        current_student: null,
        current_report: null,
      }
    }
    return {
      auth: false,
      current_user: null,
      current_course: null,
      current_teacher: null,
      current_student: null,
      current_report: null
    }
  })

  return  <AppContext.Provider value={[state, setState]}>
            {props.children}
          </AppContext.Provider>
}

export { AppContext, AppContextProvider }
const initialState = {
  currentReport: {},
  reports: [],
  removedFiles: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'GET_REPORTS':
      return {
        currentReport: state.currentReport,
        reports: [...action.payload],
        removedFiles: []
      }
    case 'ADD_REPORT':
      return {
        currentReport: action.payload,
        reports: [...state.reports, ...action.payload],
        removedFiles: []
      }
    case 'DELETE_REPORT': 
      return {
        currentReport: state.currentReport._id === action.payload ? {} : state.currentReport,
        reports: state.reports.filter(report => report._id !== action.payload),
        removedFiles: []
      }
    case 'UPDATE_REPORT':
      const idx = state.reports.findIndex(report => report._id === action.payload._id);
      return {
        currentReport: action.payload,
        reports: [
                    ...state.reports.slice(0, idx), // everything before current obj
                    action.payload,
                    ...state.reports.slice(idx + 1), // everything after current obj
                  ],
        removedFiles: []
      }
    case "SET_CURRENT_REPORT":
      return {
        currentReport: action.payload,
        reports: state.reports,
        removedFiles: []
      }
    case "REMOVE_UPLOADED_FILE":
      let _report = state.currentReport;
      _report.audios_files = _report.audios_files.filter(f => f.path !== action.payload.file.path);
      const index = state.reports.findIndex(report => report._id === action.payload.report_id);
      return {
        currentReport: _report,
        reports: [
                    ...state.reports.slice(0, index), // everything before current obj
                    _report,
                    ...state.reports.slice(index + 1), // everything after current obj
                  ],
        removedFiles: [...state.removedFiles, action.payload.file]
      }
    default:
      return state;
  }
};
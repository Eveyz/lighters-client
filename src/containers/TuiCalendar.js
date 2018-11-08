import React from "react";
import Calendar from 'tui-calendar';

import M from 'materialize-css';

class TuiCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      calendar: "",
      date: ""
    };

    this.calendarContainer = React.createRef();

    this.calendarToday = this.calendarToday.bind(this);
    this.calendarDay = this.calendarDay.bind(this);
    this.calendarMonth = this.calendarMonth.bind(this);
    this.calendarWeek = this.calendarWeek.bind(this);
    this.calendarTwoWeek = this.calendarTwoWeek.bind(this);
    this.calendarThreeWeek = this.calendarThreeWeek.bind(this);
    this.calendarPrev = this.calendarPrev.bind(this);
    this.calendarPrev = this.calendarPrev.bind(this);
    this.calendarNext = this.calendarNext.bind(this);
  }

  renderCalendarTitle(currTime, timeStart, timeEnd, mode) {
    var _time = '';
    var currTimeMonth = currTime.getMonth() + 1 < 10 ? "0" + (currTime.getMonth() + 1) : "" + (currTime.getMonth() + 1);
    var currTimeDay = currTime.getDate() < 10 ? "0" + currTime.getDate() : currTime.getDate();
  
    var timeStartMonth = timeStart.getMonth() + 1 < 10 ? "0" + (timeStart.getMonth() + 1) : "" + (timeStart.getMonth() + 1);
    var timeStartDay = timeStart.getDate() < 10 ? "0" + timeStart.getDate() : timeStart.getDate();
  
    var timeEndMonth = timeEnd.getMonth() + 1 < 10 ? "0" + (timeEnd.getMonth() + 1) : "" + (timeEnd.getMonth() + 1);
    var timeEndDay = timeEnd.getDate() < 10 ? "0" + timeEnd.getDate() : timeEnd.getDate();
  
    if(mode === "month") {
      _time = currTime.getFullYear() + '.' + currTimeMonth;
    } else if (mode === "week") {
      _time = timeStart.getFullYear() + '.' + timeStartMonth + '.' + timeStartDay + " ~ " + timeEndMonth + '.' + timeEndDay;
    } else if (mode === "day") {
      _time = currTime.getFullYear() + '.' + currTimeMonth + '.' + currTimeDay;
    };
    return _time;
  };

  componentDidMount() {
    // initializing materialize dropdown component
    M.AutoInit();
  
    // create calendar
    var _calendar = new Calendar(this.calendarContainer.current, {
      defaultView: 'week',
      taskView: false,    // can be also ['milestone', 'task']
      scheduleView: true,  // can be also ['allday', 'time']
      useCreationPopup: true,
      useDetailPopup: true,
      template: {
        task: function(schedule) {
          return '&nbsp;&nbsp;#' + schedule.title;
        },
        taskTitle: function() {
          return '<label><input type="checkbox" />Task</label>';
        },
        allday: function(schedule) {
          return schedule.title + ' <i class="fa fa-refresh"></i>';
        },
        alldayTitle: function() {
          return 'All Day';
        },
        time: function(schedule) {
          return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
        }
      },
      month: {
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        startDayOfWeek: 0,
        narrowWeekend: false
      },
      week: {
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        startDayOfWeek: 0,
        narrowWeekend: false
      }
    });
    this.setState({
      calendar: _calendar,
      date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDate(), _calendar.getDate(), _calendar.getViewName())
    });

    _calendar.createSchedules([
      {
        id: '1',
        calendarId: '1',
        title: 'my schedule',
        category: 'time',
        dueDateClass: '',
        start: '2018-11-08T20:30:00+09:00',
        end: '2018-11-08T22:30:00+09:00'
      },
      {
        id: '2',
        calendarId: '1',
        title: 'second schedule',
        category: 'time',
        dueDateClass: '',
        start: '2018-11-10T17:30:00+09:00',
        end: '2018-11-10T18:31:00+09:00',
        isReadOnly: true    // schedule is read-only
      }
    ]);
  
    _calendar.on('clickDayname', (event) => {
      if (_calendar.getViewName() === 'week') {
        _calendar.setDate(new Date(event.date));
        _calendar.changeView('day', true);
      }
    });
  
    _calendar.on({
      'clickSchedule': function(e) {
        console.log('clickSchedule', e);
      },
      'beforeCreateSchedule': function(e) {
        console.log('beforeCreateSchedule', e);
        // open a creation popup
      },
      'beforeUpdateSchedule': function(e) {
        console.log('beforeUpdateSchedule', e);
        e.schedule.start = e.start;
        e.schedule.end = e.end;
        _calendar.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);
      },
      'beforeDeleteSchedule': function(e) {
        console.log('beforeDeleteSchedule', e);
        _calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
      }
    });
  }

  calendarToday() {
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.today();
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarMonth(e) {
    e.preventDefault();
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.setOptions({month: {visibleWeeksCount: 6}}, true); // or null
      _calendar.changeView('month', true);
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarWeek(e) {
    e.preventDefault();
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.changeView('week', true);
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarTwoWeek(e) {
    e.preventDefault();
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.setOptions({month: {visibleWeeksCount: 2}}, true);
      _calendar.changeView('month', true);
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarThreeWeek(e) {
    e.preventDefault();
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.setOptions({month: {visibleWeeksCount: 3}}, true);
      _calendar.changeView('month', true);
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarDay(e) {
    e.preventDefault();
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.changeView('day', true);
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarNext() {
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.next();
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  calendarPrev() {
    let _calendar = this.state.calendar;
    if(_calendar) {
      _calendar.prev();
      this.setState({
        date: this.renderCalendarTitle(_calendar.getDate(), _calendar.getDateRangeStart(), _calendar.getDateRangeEnd(), _calendar.getViewName())
      });
    }
  };

  render() {
    return(
      <div>
        <div className="row no-margin">
          <div className="col m1">
            <a className='dropdown-trigger btn white black-text' href='#' data-target='dropdown1'>周</a>

            <ul id='dropdown1' className='dropdown-content'>
              <li><a id="calendar-month" onClick={this.calendarMonth}>月</a></li>
              <li><a id="calendar-week" onClick={this.calendarWeek}>周</a></li>
              <li><a id="calendar-day" onClick={this.calendarDay}>日</a></li>
              <li><a id="calendar-two-week" onClick={this.calendarTwoWeek}>2周</a></li>
              <li><a id="calendar-three-week" onClick={this.calendarThreeWeek}>3周</a></li>
            </ul>
          </div>
          <div className="col m1 no-padding">
            <button id="calendar-today-btn" className="btn white black-text" onClick={this.calendarToday}>今天</button>
          </div>
          <div className="col m2 no-padding">
            <div className="chip white m-box-shadow" style={{cursor: "pointer"}} id="calendar-prev" onClick={this.calendarPrev}>&lt;</div>
            <div className="chip white m-box-shadow" style={{cursor: "pointer"}} id="calendar-next" onClick={this.calendarNext}>&gt;</div>
          </div>
          <div className="col m6"><h5 style={{marginTop: "5px"}} id="calendar-date" className="no-margin">{this.state.date}</h5></div>
          <div className="col m2"></div>
        </div>
        <br/>
        <div ref={this.calendarContainer} className="calendar-height"></div>
      </div>
    );
  }
}

export default TuiCalendar;
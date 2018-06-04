'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('./utils'),
    oneOf = _require.oneOf;

var _require2 = require('./subjects'),
    gender = _require2.gender,
    firstName = _require2.firstName,
    lastName = _require2.lastName,
    sport = _require2.sport,
    art = _require2.art,
    subjects = _require2.subjects,
    getSubject = _require2.getSubject,
    getField = _require2.getField;

var askForClass = function askForClass(year, semester, progression) {
  return {
    text: 'Which subject will you focus on in your ' + year + 'th grade ' + semester + '?',
    options: [subjects.math[progression.math], subjects.english[progression.english], subjects.sports[progression.sports], subjects.art[progression.art]],
    action: function action(choice) {
      return {
        type: 'setClass',
        heading: 'Education',
        item: choice
      };
    }
  };
};

var askForSummerActivity = function askForSummerActivity(year, progression) {
  return {
    text: 'Which will you focus on in the summer after ' + year + '?',
    options: [subjects.business[progression.business], subjects.life[progression.life]],
    action: function action(choice) {
      return {
        type: 'setCareer',
        heading: 'Experience',
        item: choice
      };
    }
  };
};

var getNextScenario = function getNextScenario(state) {
  switch (state.t) {
    case 0:
      return askForClass(9, 'fall', state.progression);
    case 1:
      return askForClass(9, 'spring', state.progression);
    case 2:
      return askForSummerActivity('9th grade', state.progression);
    case 3:
      return askForClass(10, 'fall', state.progression);
    case 4:
      return askForClass(10, 'spring', state.progression);
    case 5:
      return askForSummerActivity('10th grade', state.progression);
    case 6:
      return askForClass(11, 'fall', state.progression);
    case 7:
      return askForClass(11, 'spring', state.progression);
    case 8:
      return askForSummerActivity('11th grade', state.progression);
    case 9:
      return askForClass(12, 'fall', state.progression);
    case 10:
      return askForClass(12, 'spring', state.progression);
  }
};

var rootReducer = function rootReducer(state, action) {
  if (state === undefined) {
    return {
      scenario: {
        text: 'Welcome to high school, ' + firstName + ' ' + lastName,
        options: ['Begin'],
        action: function action(choice) {
          return { type: 'nextScenario' };
        }
      },
      t: 0,
      progression: {
        math: 0,
        english: 0,
        sports: 0,
        art: 0,
        business: 0,
        life: 0
      },
      resume: {
        name: firstName + ' ' + lastName,
        Education: {},
        Skills: {},
        Experience: {}
      }
    };
  }

  var t = state.t,
      progression = state.progression,
      resume = state.resume;

  switch (action.type) {
    case 'setClass':
      var subject = getSubject(action.item);
      var nextState = _extends({}, state, {
        t: t + 1,
        progression: _extends({}, progression, _defineProperty({}, subject, progression[subject] + 1)),
        resume: _extends({}, resume, _defineProperty({}, action.heading, action.item))
      });
      nextState.scenario = getNextScenario(nextState);
      return nextState;
    case 'setCareer':
      nextState = _extends({}, state, {
        t: t + 1,
        progression: _extends({}, progression)
      });
      nextState.scenario = getNextScenario(nextState);
      return nextState;
    case 'nextScenario':
      return _extends({}, state, {
        scenario: getNextScenario(state)
      });
  }
};

module.exports = { rootReducer: rootReducer };
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../actions';

import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  return (
    <div>
      <h5>Please confirm your entry </h5>
      <div>
        {formFields.map(({ label, name }) => {
          return (
            <div key={name}>
              <label>{label}</label>
              <p>{formValues[name]}</p>
            </div>
          );
        })}
      </div>
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onCancel}>
        Back
      </button>
      <button
        className="green btn-flat right white-text"
        onClick={() => submitSurvey(formValues, history)}>
        Send Survey <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  formValues: state.form.surveyForm.values,
});

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

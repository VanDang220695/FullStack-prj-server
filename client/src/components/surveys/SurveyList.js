import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchSurvey } from '../../actions';
const SurveyList = (props) => {
  useEffect(() => {
    props.fetchSurvey();
  }, []);
  return (
    <div>
      {props.surveys
        .reverse()
        .map(({ title, _id, body, dateSent, yes, no }) => (
          <div class="card darken-1" key={_id}>
            <div class="card-content">
              <span class="card-title">{title}</span>
              <p>{body}</p>
              <p className="right">
                Sent on: {new Date(dateSent).toLocaleDateString()}
              </p>
            </div>

            <div className="card-action">
              <a>Yes: {yes}</a>
              <a>No: {no}</a>
            </div>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = ({ surveys }) => ({
  surveys,
});

export default connect(mapStateToProps, { fetchSurvey })(SurveyList);

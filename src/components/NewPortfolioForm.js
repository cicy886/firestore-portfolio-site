import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase'

function NewPortfolioForm(props){

  const firestore = useFirestore();

  function addPortfolioToFirestore(event) {
    event.preventDefault();
    props.onNewPortfolioCreation();
    return firestore.collection('portfolios').add(
      {
        project: event.target.project.value,
        skills: event.target.skills.value, 
        bio: event.target.bio.value
      }
    );
  }
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={addPortfolioToFirestore}
        buttonText="Submit" />
    </React.Fragment>
  );
}
  
  NewPortfolioForm.propTypes = {
    onNewPortolioCreation: PropTypes.func
  };
  
  export default NewPortfolioForm;

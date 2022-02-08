import React from 'react';
import NewPortfolioForm from './NewPortfolioForm';
import PortfolioDetail from './PortfolioDetail';
import EditPortfolioForm from './EditPortfolioForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore, isLoaded } from 'react-redux-firebase';

class PortfolioControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPortfolio: null,
      editing: false
    };
  }

  handleAddingNewPortfolio = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleClick = () => {
    if (this.state.selectedPortfolio != null) {
      this.setState({
        selectedPortfolio: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleChangingSelectedPortfolio = (id) => {
    this.props.firestore.get({collection: 'portfolios', doc: id}).then((portfolios) => {
      const firestorePortfolio = {
        project: portfolios.get("project"),
        skills: portfolios.get("skills"),
        bio: portfolios.get("bio"),
        id: portfolios.id
      }
      this.setState({selectedPortfolio: firestorePortfolio });
    });
  }


  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingPortfolio = () => {
    this.setState({
      editing: false,
      selectedPortfolio: null
    });
  }

  // handleDeletingPortfolio = (id) => {
  //   this.props.firestore.delete({collection: 'portfolio', doc: id});
  //   this.setState({selectedPortfolio: null});
  // }
  render(){
    // const auth = this.props.firebase.auth();
    // if (!isLoaded(auth)) {
    //   return (
    //     <React.Fragment>
    //       <h1>Loading...</h1>
    //     </React.Fragment>
    //   )
    // }
    // if ((isLoaded(auth)) && (auth.currentUser == null)) {
    //   return (
    //     <React.Fragment>
    //       <h1>You must be signed in to access your portfolio</h1>
    //     </React.Fragment>
    //   )
    // }
    // if ((isLoaded(auth)) && (auth.currentUser != null)) { 
      let currentlyVisibleState = null;
      let buttonText = null;

      if (this.state.editing ) {      
        currentlyVisibleState = <EditPortfolioForm portfolio = {this.state.selectedPortfolio} onEditPortfolio = {this.handleEditingPortfolio} />
        buttonText = "Return to Portfolio";
      }
      
      else if (this.state.selectedPortfolio != null) {
        currentlyVisibleState = <PortfolioDetail 
        Portfolio = {this.state.selectedPortfolio} 
        // onClickingDelete = {this.handleDeletingPortfolio}
        onClickingEdit = {this.handleEditClick} />
        buttonText = "Return to Portfolio";
      }
      else if (this.props.formVisibleOnPage) {
        currentlyVisibleState = <NewPortfolioForm 
        onNewPortfolioCreation={this.handleAddingNewPortfolio} />;
        //<NewPortfolioForm />;
        buttonText = "Return to Portfolio";
      }
      // } else {
      //   currentlyVisibleState = <PortfolioList portfolioList={this.props.mainPortfolioList} onPortfolioSelection={this.handleChangingSelectedPortfolio} />;
      //   buttonText = "Add Portfolio"; 
      // }
      return (
        <React.Fragment>
          {currentlyVisibleState}
          <button onClick={this.handleClick}>{buttonText}</button>
        </React.Fragment>
      );
    }
  }
//}

// render(){
//   let currentlyVisibleState = null;
//   let buttonText = null;
//   if (this.props.formVisibleOnpage) {
//     currentlyVisibleState = <PortfolioDetail />;
//     buttonText = "Edit Portfolio";
//   } else {
//     currentlyVisibleState = <NewPortfolioForm />;
//     buttonText = "Update Portfolio";
//   }

//   return (
//     <React.Fragment>
//       {currentlyVisibleState}
//       <button onClick={this.handleClick}>{buttonText}</button>
//     </React.Fragment>
//   );
// }
// }

PortfolioControl.propTypes = {
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    formVisibleOnPage: state.formVisibleOnPage
  }
}

PortfolioControl = connect(mapStateToProps)(PortfolioControl);

export default withFirestore(PortfolioControl);

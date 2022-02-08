import React from "react";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function PortfolioDetail(){
  useFirestoreConnect([
      { collection: 'portfolios'}
    ]);

    const portfolios = useSelector(state => state.firestore.ordered.portfolios);
    const myPortfolio = portfolios.map((portfolio) => 
          // {return <PortfolioDetail
          //   project = {portfolio.porject}
          //   skills = {portfolio.skills}
          //   bio = {portfolio.bio}/>
          //   // {portfolio.project}
          // })}
          <h3>{portfolio}</h3>
          )
    

    // if (isLoaded(portfolios)){
      return (

        
        <React.Fragment>
          <hr/>
          <h3>{myPortfolio}</h3>

          

          {/* <h3>hello{props.project}</h3> */}
          {/* console.log */}
          {/* <h3> */}
          {/* {portfolios.map((portfolios) => {
            return <PortfolioDetail */}
            {/* {props.project}
            {props.skills}
            {props.bio}
            {props.id}
            {props.id}</h3> */}
          {/* })} */}
      </React.Fragment>
  );
  //   } else {
  // return (

  //   <React.Fragment>
  //     {/* <h1>Portfolio Detail</h1>
  //     <h3>{props.project}</h3>
  //     <h4>{props.skills}</h4>
  //     <h4>{props.bio}</h4>
  //     <button onClick = { props.onClickingEdit}>Update Portfolio</button> */}
  //     <h3>Loading...</h3>
  //   </React.Fragment>
  // );
}
//}

PortfolioDetail.propTypes = {
  project: PropTypes.string,
  skills: PropTypes.string,
  bio: PropTypes.string,
  id: PropTypes.string
};

export default PortfolioDetail;
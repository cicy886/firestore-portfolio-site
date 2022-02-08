import React from 'react';
import Header from './Header';
import PortfolioDetail from './PortfolioDetail'
import EditPortfolioForm from './EditPortfolioForm';
import NewPortfolioForm from './NewPortfolioForm';
import ReusableForm from './ReusableForm';
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PortfolioControl from './PortfolioControl';


function App() {
  return (
    <React.Fragment>
      <Header />
      <PortfolioControl />
      <PortfolioDetail />
      <EditPortfolioForm />
      <NewPortfolioForm />
      <ReusableForm />
    </React.Fragment>
  );
}

export default App;

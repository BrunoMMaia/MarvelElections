import 'react-tabs/style/react-tabs.css';
import { Api } from '../api';
import Header from './Header';
import ElectionsPage from './ElectionsPage';



 
export default function Homepage() {
  Api.getCandidates()
  Api.getElections()
  
  return (
    <>
      <Header>react-flash-cards-v3</Header> 
      <ElectionsPage />
    </>
  );
}

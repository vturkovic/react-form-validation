import './App.css';
import FormikComponent from './components/formikComponent';
import FormComponent from './components/formComponent';

const App = () => {
  return (
    <div className="forms-container">
      <FormComponent />
      <FormikComponent />
    </div>
  );
}

export default App;
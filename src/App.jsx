import Header from './assets/Components/Header/Header';
import Input from './assets/Components/Input/Input';
import Table from './assets/Components/Table/Table';
import { useState } from 'react';


const yearlyData = [];

function App() {

  const [userInput, setUserInput] = useState(null);

  const ResetHandler = () => setUserInput(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
    if (userInput) {


      let currentSavings = +userInput['current-savings'];
      const yearlyContribution = +userInput['yearly-contribution'];
      const expectedReturn = +userInput['expected-return'] / 100;
      const duration = +userInput['duration'];

      for (let i = 0; i < duration; i++) {
        const yearlyInterest = currentSavings * expectedReturn;
        currentSavings += yearlyInterest + yearlyContribution;
        yearlyData.push({
          year: i + 1,
          yearlyInterest: yearlyInterest,
          savingsEndOfYear: currentSavings,
          yearlyContribution: yearlyContribution
        });
      }
    }
  };

  return (
    <div>
      <Header></Header>
      <Input onResett={ResetHandler} onCalculate={calculateHandler}></Input>
      {!userInput && <h2 style={{ textAlign: 'center' }}>No Data to Show</h2>}    {/*conditionally showing output here*/}
      {userInput && <Table initialInvestment={userInput['current-savings']} data={yearlyData} />}
    </div>
  );
}

export default App;

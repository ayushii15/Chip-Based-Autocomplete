// App.js
import React from 'react';
import ChipAutoComplete from './ChipAutoComplete';

function App() {
  const suggestions = [
    'HTML',
    'Figma',
    'Development',
    'Debugging',
    'Denazification',
    'UI design',
    'Web design',
    'React',
    'Hands On',
    'Live Coding',
    'Angular',
    'Vue JS',
    'JS Fundamentals',
    'Typescript',
    'Browser/DOM',
    'API',
    'Router',
    'Forms',
    'Jest',
    'Vue',
    'Templates',
    'Directives',
    'Routing',
    'State management',
    'Asynchronous programming',
    'React Js',
    'Hooks',
    'JSX',
    'CSS',
    'Flex',
    'DOM',
  ];

  return (
    <div className="container">
      <h3 id = "main-heading">Chips Usage: Autocomplete</h3><br></br><br></br>
      <h4 id = "sub-heading">INPUT TAGS</h4>
      <ChipAutoComplete initialTags={['Figma', 'CSS', 'HTML']} suggestions={suggestions} />
      <p id ="para">Enter a comma-separated chips and enjoy</p><br></br><br></br>
      <p id = "footer">
        <span className = "black">Chips</span> can be utilized to showcase <span className = "black">autocomplete suggestions</span> as users
        input information
      </p>
    </div>
  );
}

export default App;

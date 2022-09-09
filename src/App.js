import './App.css';
import './components/card-list/card-list.component'
import './components/search-box/search-box.component'
import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <h1> hello</h1>
//     </div>
//   );
// }

class App extends Component{
  constructor(){
    super();
    this.state={
      monsters:[ ],
      searchField:''
    };
  }
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=>response.json())
    .then((users)=>this.setState(()=>{
        return {monsters:users};
      },
      ()=>{
        console.log(this.state);
      }
    ));
  }
  onSearchChange=(event)=>{
    const searchField =event.target.value.toLocaleLowerCase();
    this.setState(()=>{
      return { searchField };
    });
  }
  render(){
    const {monsters ,searchField} =this.state;
    const {onSearchChange}=this;
    const filteredMonsters= monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(this.state.searchField);

  });
    return(
      <div className='App'>
       
        {/* {filteredMonsters.map((monster)=>{
          return(
            <div key={monster.id}>
              <h1>{monster.name}</h1>
              </div>
          );
        })} */}
         <h1 class="app-title">Monster Register</h1>
        <SearchBox
        className='search-box' 
        onChangeHandler={onSearchChange} placeholder={'search monster'}/>
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}
export default App;

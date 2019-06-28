import React, {Component} from 'react';
import CardList from '../components/CardList'; // parent of Card component
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import './App.css';

export interface IRobot {
  name: string;
  id: number;
  email: string;
}

interface IAppProps{}

interface IAppState {
  robots: Array<IRobot>;
  searchField: string;
}


class App extends Component {
  constructor(){
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response=> response.json())
      .then(users=> this.setState({robots: users}))
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value})
    console.log(event.target.value);
  }

  render(){
    const {robots, searchfield} = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
  
    if (robots.length){ // if there is more than 0, then it's true
      return (
        <div className='tc'>
          <h1 className='f2 '>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots}/>
          </Scroll>
        </div>
      );
    } else{
      return <h1>Loading</h1>
    }
  }
}

export default App;
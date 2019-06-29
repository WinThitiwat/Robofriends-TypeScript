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

// our app doesn't receive any props, so leave empty
interface IAppProps{}

interface IAppState {
  robots: Array<IRobot>;
  searchField: string;
}


class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps){
    super(props)
    this.state = {
      robots: [],
      searchField: ''
    }
  }

  componentDidMount(): void {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response=> response.json())
      .then(users=> this.setState({robots: users}))
  }

  onSearchChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({searchField: event.currentTarget.value})
  }

  render(): JSX.Element {
    const {robots, searchField} = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
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
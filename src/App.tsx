import React,{Component} from 'react';
import './App.css';
import Form from './hoc/form';
import Generator from './generator';

interface StateType {
  mainInfo:any,
  location:any,
  privateData:any,
  peopleParams:any,
  personalCode:string | null
}

export default class App extends Component<{},StateType> {
  state:any = {
    mainInfo: {
      name: null,
      surname: null
    },
    location: {
      country: null,
      countryCode: null,
      street: null,
      telephone: null
    },
    peopleParams: {
      sex: null,
      height: null,
      weight: null
    },
    privateData: {
      birthDay: null,
      birthMonth: null,
      monthInNum: null,
      birthYear: null
    },
    personalCode: null
  };

  generator = () => {
    const gen = new Generator();
    gen.createPC();
    this.setState({
      mainInfo: gen.getMainInfo(),
      location: gen.getLocation(),
      peopleParams: gen.getPeopleParams(),
      privateData: gen.getDate(),
      personalCode: gen.createPC()
    })
  }
  
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const personalCode:any = this.state.personalCode;
    const {location} = this.state;
    const mainInfo = {...this.state.mainInfo, personalCode};
    const newLocation = {
      ...location,
      telephone: location.countryCode || location.telephone !== null ? location.countryCode + " " + location.telephone : null};
    const peopleParams = {...this.state.peopleParams};
    const privateData = {...this.state.privateData};

    return (
        <div className="App">
          <div className="Header">
               <h1>Generator</h1>
          </div>
            <div className="ValueSpace">
            <Form style="MainInfo"
                  labels={Object.keys(mainInfo)} 
                  state={mainInfo}
            />
            <Form style="Location" 
                  labels={Object.keys(newLocation).filter(el => el !== "countryCode")}
                  state={newLocation}
            />
            <Form style="PrivateData"
                  labels={Object.keys(privateData).filter(el => el !== "monthInNum")}
                  state={privateData} 
            />
            <Form style="PeopleParams"
                  labels={Object.keys(peopleParams)}
                  state={peopleParams}
            />
            <button className="ButtonStyle" onClick={this.generator}/>
          </div>
        </div>
    );
  }
}

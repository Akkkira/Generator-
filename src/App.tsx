import React,{Component} from 'react';
import './App.css';
import Form from './hoc/form';
const names = require("./dataBase/firstName");
const surnames = require("./dataBase/lastName");
const address = require("./dataBase/address");
const phones = require("./dataBase/phone");
const alphabet = require("./dataBase/alphabet");
const soc = require("./dataBase/soc");

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface StateType {
  mainInfo:any,
  location:any,
  privateData:any,
  peopleParams:any,
  name:string,
  surname:string
  sex:string,
  birthDay:string,
  birthMonth:string,
  monthInNum:string,
  birthYear:string,
  country:string,
  height:string,
  weight:string,
  telephone:string,
  street:string,
  countryCode:string
}

export default class App extends Component<{},StateType> {
  state:any = {
    mainInfo: {
      name:null,
      surname:null
    },
    location: {
      country:null,
      countryCode: null,
      street:null,
      telephone:null
    },
    peopleParams: {
      sex:null,
      height:null,
      weight:null
    },
    privateData:{
      birthDay:null,
      birthMonth:null,
      monthInNum:null,
      birthYear:null
    }
  };

  getSoC = () => soc[(Math.random() * 2).toFixed(0)];

  getLetterForIdeficCode = () => alphabet[(Math.random() * 25).toFixed(0)];

  getMainInfo = () => {
    const newName:string = names[(Math.random() * 2000).toFixed(0)]
    const newSurname:string = surnames[(Math.random() * 100).toFixed(0)]
    this.setState({
      mainInfo: {
        name: newName,
        surname: newSurname
      }
    })
  };

  getLocation = () => {
    const countryInfo: any = this.findOne(address, 18);
    const telephone:string = this.findOne(phones,19).phone
    this.setState({
      location: {
        country: countryInfo.country,
        countryCode: countryInfo.countryCode,
        street: countryInfo.street,
        telephone: telephone
      }
    });
  }

  getPeopleParams = () => {
    const weight:string = (Math.random() * (120 - 50) + 50).toFixed(1);
    const height:string = (Math.random() * (197 - 155) + 155).toFixed(0);
    const sex:string = Math.random().toFixed(0) === "1" ? "male" : "female";
    this.setState({
      peopleParams: {
        sex: sex,
        height: height,
        weight: weight
      }
    })
  }

  getDate = () => {
    const year = (Math.random()*(2020 - 1930)+1930).toFixed(0);
    const month = (Math.random()*11).toFixed(0);
    const day = (Math.random()*(31-1)+1).toFixed(0);
    const data = new Date(+year, +month, +day);
    this.setState({
      privateData:{
        birthDay: day.length > 1 ? `${+day+1}` : `0${+day+1}`,
        birthMonth: monthNames[data.getMonth()],
        monthInNum: month.length > 1 ? `${+month+1}` : `0${+month+1}`,
        birthYear: ""+data.getFullYear()
      }
    })
  }

  getFirstNumofIndeficNum = () =>{
    const {peopleParams, privateData} = this.state;
    const temp:string = privateData.birthYear !== null ? privateData.birthYear.substring(0,1) : "1";
    return temp === "1" && peopleParams.sex === "male" ? "3" : temp === "1" && peopleParams.sex === "female" ? "4" :
        temp === "2" && peopleParams.sex === "male" ? "5" : "6"
    };

  findOne = (arr:any, n:number) => {
    let temp:string;
    temp = (Math.random() * n).toFixed(0);
    const value: any = arr.map((ad: { id: string; }) => ad.id === temp ? ad : null);
    return value[temp];
  };

  createPC = () => {
    return this.state.privateData.birthDay !== null ? this.getFirstNumofIndeficNum() +
        this.state.privateData.birthDay + this.state.privateData.monthInNum  + this.state.privateData.birthYear.substring(2) + this.getLetterForIdeficCode() +
        (Math.random() * (999 - 100) + 100).toFixed(0) + this.getSoC() + (Math.random() * 9).toFixed(0) : null;
  }

  generator = () => {
    this.getMainInfo();
    this.getLocation();
    this.getPeopleParams();
    this.getDate();
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const personalCode:any = this.createPC();
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

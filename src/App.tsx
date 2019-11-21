import React,{Component} from 'react';
import './App.css';
import MainData from './components/MainData'
const names = require("./DataBase/firstName");
const surnames = require("./DataBase/lastName");
const address = require("./DataBase/address");
const phones = require("./DataBase/phone");
const datesOfBirth = require("./DataBase/dateBirth");
const alphabet = require("./DataBase/alphabet");
const soc = require("./DataBase/soc");

interface StateType {
  name:string,
  surname:string,
  sex:string,
  fatherName:string,
  birthDay:string,
  birthMonth:string,
  monthInNum:string,
  birthYear:string,
  country:string,
  height:string,
  weight:string,
  telephone:string,
  homeNumber:string,
  street:string,
  personalCode:string,
  countryCode:string
}

export default class App extends Component<{},StateType> {
  state:any = {
    name:null,
    surname:null,
    sex:null,
    birthDay:null,
    birthMonth:null,
    monthInNum:null,
    birthYear:null,
    country:null,
    height:null,
    weight:null,
    telephone:null,
    homeNumber:null,
    street:null,
    personalCode:null,
    countryCode: null
  };

  getSoC = () => soc[(Math.random() * 2).toFixed(0)];

  getLetterForIdeficCode = () => alphabet[(Math.random() * 25).toFixed(0)];

  getName = () => {const temp:string = names[(Math.random() * 2000).toFixed(0)]
  this.setState({name: temp})};

  getSurname = () =>{const temp:string = surnames[(Math.random() * 100).toFixed(0)]
    this.setState({surname:temp})};

  getWeight = () =>{const temp:string = (Math.random() * (120 - 50) + 50).toFixed(1)
    this.setState({weight: temp})};

  getHeight = () => {const temp:string = (Math.random() * (197 - 155) + 155).toFixed(0)
    this.setState({height: temp})};

  getYearBirth = () => (Math.random() * (2001 - 1940) + 1940).toFixed(0);

  getSex = () => {const temp:string = Math.random().toFixed(0) === "1" ? "male" : "female"
  this.setState({sex: temp})};

  getFirstNumofIndeficNum = () =>{
    const temp:string = this.state.birthYear !== null ? this.state.birthYear.substring(0,1) : "1";
    return temp === "1" && this.state.sex === "male" ? "3" : temp === "1" && this.state.sex === "female" ? "4" :
        temp === "2" && this.state.sex === "male" ? "5" : "6"};

  getDateBirth = () => {
    const temp: any = this.findOne(datesOfBirth, 2);
    const months: any = temp.months;
    let countOfMonth: number = temp.id === "0" ? 6 : temp.id === "1" ? 3 : 0;
    let countOfDays: number = temp.id === "0" ? 30 : temp.id === "1" ? 29 : 28;
    let indOfDay: string = (Math.random() * countOfDays).toFixed(0);
    const flex:any = this.findOne(months,countOfMonth);
    const year:string = this.getYearBirth();
    this.setState({
      birthDay: temp.days[indOfDay],
      birthMonth:flex.text,
      monthInNum: flex.num,
      birthYear: year})
  };

  getAddress = () => {
    const temp: any = this.findOne(address, 18);
    this.setState({
      country: temp.country,
      street: temp.street,
      countryCode: temp.countryCode
    });
  };

  getPhone = () => {
    const temp:string = this.findOne(phones,19).phone
    this.setState({telephone: temp})};


  findOne = (arr:any, n:number) => {
    let temp:string;
    temp = (Math.random() * n).toFixed(0);
    const value: any = arr.map((ad: { id: string; }) => ad.id === temp ? ad : null);
    return value[temp];
  };

  generator = () => {
    this.getName();
    this.getSurname();
    this.getSex();
    this.getWeight();
    this.getHeight();
    this.getAddress();
    this.getPhone();
    this.getDateBirth();
    this.getYearBirth();
  };

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    const personalCode:any = this.state.birthDay !== null ? this.getFirstNumofIndeficNum() +
        this.state.birthDay + this.state.monthInNum  + this.state.birthYear.substring(2) + this.getLetterForIdeficCode() +
        (Math.random() * (999 - 100) + 100).toFixed(0) + this.getSoC() + (Math.random() * 9).toFixed(0) : null;
    return (
        <div className="App">
          <div className="Header">
               <h1>Generator</h1>
          </div>
          <div className="ValueSpace">
            <div className="MainInfo">
            <MainData label={"Name"} value={this.state.name}/>
            <MainData label={"Surname"} value={this.state.surname}/>
            <MainData label={"Personal code"} value={personalCode}/>
            </div>
            <div className="Location">
            <MainData label={"Country"} value={this.state.country}/>
            <MainData label={"Street"} value={this.state.street}/>
            <MainData label={"Phone"} value={this.state.countryCode + " " + this.state.telephone}/>
            </div>
            <div className="PrivateData">
            <MainData label={"Day of Birth"} value={this.state.birthDay}/>
            <MainData label={"Month of Birth"} value={this.state.birthMonth}/>
            <MainData label={"Year of Birth"} value={this.state.birthYear}/>
            </div>
            <div className="qwerty">
              <MainData label={"Sex"} value={this.state.sex}/>
              <MainData label={"Weight"} value={this.state.weight}/>
              <MainData label={"Height"} value={this.state.height}/>
            </div>
            <div>
            <button className="ButtonStyle" onClick={this.generator}/>
            </div>
          </div>
        </div>
    );
  }
}

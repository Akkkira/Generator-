const names = require("./dataBase/firstName");
const surnames = require("./dataBase/lastName");
const address = require("./dataBase/address");
const phones = require("./dataBase/phone");
const alphabet = require("./dataBase/alphabet");
const soc = require("./dataBase/soc");
const monthNames = require("./dataBase/monthNames")

interface StateType {
    mainInfo:any,
    location:any;
    privateData:any;
    peopleParams:any,
}

interface ILocation {
    country:string,
    telephone:string,
    street:string,
    countryCode:string
}

interface IPrivateData {
    birthDay:string,
    birthMonth:string,
    monthInNum:string,
    birthYear:string,
}

interface IPeopleParams {
    sex:string,
    height:string,
    weight:string
}

interface IMainInfo {
    name:string,
    surname:string
}

class Generator implements StateType {
    public mainInfo:IMainInfo = {
        name:"",
        surname:""
    }
    public location:ILocation = {
        country:"",
        countryCode:"",
        street:"",
        telephone:""
    }
    public peopleParams:IPeopleParams = {
        sex:"",
        height:"",
        weight:""
    }
    public privateData:IPrivateData = {
        birthDay:"",
        birthMonth:"",
        monthInNum:"",
        birthYear:""
    }
    public personalCode:string|null = null;

    getSoC = () => soc[(Math.random() * 2).toFixed(0)];

    getLetterForIdeficCode = () => alphabet[(Math.random() * 25).toFixed(0)];

    getMainInfo = () => {
        const newName:string = names[(Math.random() * 2000).toFixed(0)]
        const newSurname:string = surnames[(Math.random() * 100).toFixed(0)]
        const obj = {
            name: newName,
            surname: newSurname
        };
        this.mainInfo = obj;
        return obj;
    };

    getPeopleParams = () => {
        const weight:string = (Math.random() * (120 - 50) + 50).toFixed(1);
        const height:string = (Math.random() * (197 - 155) + 155).toFixed(0);
        const sex:string = Math.random().toFixed(0) === "1" ? "male" : "female";
        const obj = {
            sex: sex,
            height: height,
            weight: weight
        }
        this.peopleParams = obj;
        return obj;
    }
    
    getDate = () => {
        const year = (Math.random()*(2020 - 1930)+1930).toFixed(0);
        const month = (Math.random()*11).toFixed(0);
        const day = (Math.random()*(31-1)+1).toFixed(0);
        const data = new Date(+year, +month, +day);
        const obj = {
            birthDay: day.length > 1 ? `${+day+1}` : `0${+day+1}`,
            birthMonth: monthNames[data.getMonth()],
            monthInNum: month.length > 1 ? `${+month+1}` : `0${+month+1}`,
            birthYear: ""+data.getFullYear()
        }
        this.privateData = obj;
        return obj;
    }

    getLocation = () => {
        const countryInfo: any = this.findOne(address, 18);
        const telephone:string = this.findOne(phones,19).phone;
        const obj =  {
            country: countryInfo.country,
            countryCode: countryInfo.countryCode,
            street: countryInfo.street,
            telephone: telephone
        }
        this.location = obj;
        return obj;
    }

    getFirstNumofIndeficNum = () =>{
        const {peopleParams, privateData} = this;
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
        const personalCode = this.privateData.birthDay !== null ? this.getFirstNumofIndeficNum() +
        this.privateData.birthDay + this.privateData.monthInNum  + this.privateData.birthYear.substring(2) + this.getLetterForIdeficCode() +
        (Math.random() * (999 - 100) + 100).toFixed(0) + this.getSoC() + (Math.random() * 9).toFixed(0) : null;
        this.personalCode = personalCode;
        return personalCode;
    }
}

export default Generator;
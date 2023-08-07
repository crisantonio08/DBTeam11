import http from "axios";
import moment from "moment";
import { getAuth } from 'firebase/auth';
//npm install moment --save

// const bonds = [
//     {
//         issuerName:'BNPParibasIssu 4,37% Microsoft Corp (USD)',
//         isin:'XS1988387210',
//         bond_maturity_date:Date.parse('05/08/2021'),
//         coupon_percent:4.37,        
//         faceValue:1000
//     }, {
//         issuerName:'Airbus 3.15%  USD',
//         isin:'USN0280EAR64',
//         bond_maturity_date:Date.parse('30/07/2021'),
//         coupon_percent:3.15,
//         faceValue:900
//     },{
//         issuerName:'UBS Facebook (USD)',
//         isin:'A12356111',
//         bond_maturity_date:Date.parse('30/09/2021'),
//         coupon_percent:2,
//         faceValue:900
//     }
//   ]

// export const getAllBonds = () => {
//   ; //axios.get(`${hostNameUrl}/dogs`);
//   return bonds;
// };

export function getAllBonds(userChecked) {
    console.log(userChecked)
    if (userChecked) {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log(user)
        return http.get("http://localhost:8080/api/v1/bondsdata/all/user/" + user.uid)
    } else {
        return http.get("http://localhost:8080/api/v1/bondsdata/all")
    }
}

// export const getBondsByDate = (date) => {
//     return bonds.filter(function(itm) {
//         return itm.bondMaturityDate == date;
//     })
// }

export function getBondsByDate(props) {
    var date = props.info.date;
    var check = props.info.check;
    date = moment(date).format('YYYY-MM-DD');

    if(!check){
        return http.get("http://localhost:8080/api/v1/bondsdata/all/{date}?date=" + date)
    }else{
        const auth = getAuth();
        const user = auth.currentUser;
        console.log(user.uid);
        return http.get("http://localhost:8080/api/v1/bondsdata/all/user/"+user.uid+"?date="+date)

    }
}
import http from "axios";
import moment from "moment";
import { getAuth } from 'firebase/auth';

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
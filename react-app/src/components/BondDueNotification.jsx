import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

const BondDueNotification = (props) => {
    var maturityDateMoment = moment(props.info.bond.bondMaturityDate);
    var selectedDateMoment = moment(props.info.date);
    var days = maturityDateMoment.diff(selectedDateMoment, 'days');  
    console.log('BOND DATE TYPES', maturityDateMoment.format("YYYY-MM-DD"), selectedDateMoment.format("YYYY-MM-DD"),days)

    var message = "";
    var notifs = [...props.info.notifications];

    if (days === 0) {
        message = `Bond with ISIN ${props.info.bond.isin} is due today!`;
        notifs.push(message)
    }
    else if (days === 1) {
        message = `Bond with ISIN ${props.info.bond.isin} is due tomorrow!`;
        notifs.push(message)
    }
    else if(days < 0 && props.info.bond.status !== "redeemed") {
        message = `Bond with ISIN ${props.info.bond.isin} is not redeemed and is overdue by ${Math.abs(days)} days!`;
        notifs.push(message)
      }
    
    props.info.setNotifications(notifs);

    console.log(props.info.notifications)
    return (
    // <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    //   <div class="toast-header">
    //     <strong class="mr-auto">Bond Alert</strong>
    //     <button
    //       type="button"
    //       class="ml-2 mb-1 close"
    //       data-dismiss="toast"
    //       aria-label="Close"
    //     >
    //       <span aria-hidden="true">&times;</span>
    //     </button>
    //   </div>
    //   <div>
    //     <>{message}</>
    //   </div>
    // </div>
    <div>{message}</div>
  );
};

export default BondDueNotification;

import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

const BondDueNotification = (props) => {
    var maturityDateMoment = moment(props.info.bond.bondMaturityDate);
    var selectedDateMoment = moment(props.info.date);
    var days = maturityDateMoment.diff(selectedDateMoment, 'days');  
    //console.log(props.info.notifications);

    var message = "";

    if (days === 0) {
        message = `Bond with ISIN ${props.info.bond.isin} is due today!`;
        props.info.notifications.push(message)
    }
    else if (days === 1) {
        message = `Bond with ISIN ${props.info.bond.isin} is due tomorrow!`;
        props.info.notifications.push(message)
    }
    else if(days < 0 && props.info.bond.status !== "redeemed") {
        message = `Bond with ISIN ${props.info.bond.isin} is not redeemed and is overdue by ${Math.abs(days)} days!`;
        props.info.notifications.push(message)
      }

      props.info.setNotifications(props.info.notifications)

    //props.info.setNotifications(props.info.notifications.push(message))
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
      <div>
       {message}
      </div>
    // </div>
  );
};

export default BondDueNotification;

import moment from 'moment';

const BondDueNotification = (props) => {
    var maturityDateMoment = moment(props.info.bond.bondMaturityDate);
    var selectedDateMoment = moment(props.info.date);
    var days = selectedDateMoment.diff(maturityDateMoment, 'days');  
    console.log(props.info.bond) ;
    console.log('BOND DATE TYPES', maturityDateMoment.format("YYYY-MM-DD"), selectedDateMoment.format("YYYY-MM-DD"),days)

    var message = "";

    if (days === 0) {
        message = `Bond with ISIN ${props.info.bond.isin} is due today!`;
    }
    else if (days === 1) {
        message = `Bond with ISIN ${props.info.bond.isin} is due tomorrow!`;
    }
    else if(days < 0 && props.info.bond.status !== "redeemed") {
        message = `Bond with ISIN ${props.info.bond.isin} is not redeemed and is overdue by ${Math.abs(days)} days!`;
    }


    return (
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="mr-auto">Bond Alert</strong>
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">{message}</div>
    </div>
  );
};

export default BondDueNotification;

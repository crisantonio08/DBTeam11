import moment from 'moment';


const BondDueNotification = (selectedDate, bond) => {
    var maturityDateMoment = moment(bond.bondMaturityDate);
    var selectedDateMoment = moment(selectedDate);

    var diff = maturityDateMoment - selectedDateMoment;
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    console.log('BOND DATE TYPES', maturityDateMoment, selectedDateMoment,diff,days)

    var message = "";

    if (days === 0) {
        message = `Bond with ISIN ${bond.isin} is due today!`;
    }
    else if (days === 1) {
        message = `Bond with ISIN ${bond.isin} is due tomorrow!`;
    }
    else if(days < 0 && bond.status !== "redeemed") {
        message = `Bond with ISIN ${bond.isin} is not redeemed and is overdue by ${Math.abs(days)} days!`;
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

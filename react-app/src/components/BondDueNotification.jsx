const BondDueNotification = (selected_date, bond) => {
    var diff = bond.bondMaturityDate - selected_date;
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
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

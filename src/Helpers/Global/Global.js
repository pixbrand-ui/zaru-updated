const Global = {
  Date: (date) => {
    if (date) {
      var dt = new Date(date).getDate();
      var mn = new Date(date).getMonth();
      mn = mn + 1;
      if (mn.toString().length === 1) {
        mn = "0" + mn;
      }
      if (dt.toString().length === 1) {
        dt = "0" + dt;
      }
      var yy = new Date(date).getFullYear();
      return yy + "-" + mn + "-" + dt;
    }
  },
};

export default Global;

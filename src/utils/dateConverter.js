import React from "react";
import moment from "moment";

export const EpochDateConverter = (date) => {
  var day = moment.unix(date);

  const dateFormat = day.format("ddd, MMM Do YYYY, h:mm a");
  return dateFormat;
};

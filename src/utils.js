import moment from "moment";

export const scrollToTop = (value) =>
  window.scrollTo({
    top: value || 300,
    behavior: "smooth"
  });


export const defaultPagination = {
  first: 6,
  skip: 0
};

export const clearObject = (obj) => {
  Object.keys(obj).forEach(key => {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "")
      delete obj[key];
  });
  return obj;
};


export const parseDate = (date) => {
  const diff = moment().diff(moment(date));
  const time = moment.duration(diff)._data;
  if (time.days) {
    return `${time.days} days ago`;
  }
  if (time.hours) {
    return `${time.hours} hours ago`;
  }
  if (time.minutes) {
    return `${time.minutes} minutes ago`;
  }
  return "few minutes ago";
};
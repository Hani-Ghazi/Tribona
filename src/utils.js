export const scrollToTop = () =>
  window.scrollTo({
    top: 300,
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
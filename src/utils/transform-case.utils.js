import camelCase from "lodash/camelCase.js";

export const toCamelCase = (target) => {
  if (target === undefined || target === null) {
    return target;
  }
  if (Array.isArray(target)) {
    return target.map((element) => toCamelCase(element));
  }
  if (typeof target === "object" && Object.keys(target).length > 0) {
    return Object.keys(target).reduce((result, key) => {
      result[camelCase(key)] = toCamelCase(target[key]);
      return result;
    }, {});
  }
  return target;
};

export const dateParser = (num: Date) => {
  let options: Object = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  
  let date = new Date(num).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const timestampParser = (num: number) => {
  let options: Object = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let date = new Date(num).toLocaleDateString("fr-FR", options);

  return date.toString();
}

export const arrayRemove = (arr: string[], value: string) => {
  return arr.filter(function (ele) {
    return ele !== value;
  });
};

export const isEmpty = (value: object | string) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};


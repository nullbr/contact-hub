// convert input to number
const getNum = (value: string | null | undefined): number | string => {
  if (!value) return "";

  return parseInt(value);
};

export default getNum;

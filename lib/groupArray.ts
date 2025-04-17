/* eslint-disable @typescript-eslint/no-explicit-any */
export const groupArray: <T>(array: any, value:string) => T = (array, value="catergory") =>{

 return array.reduce((prev: any, curr: any) => {
  const nests = value.split(".")
    const key = nests.reduce((acc, nest) => acc?.[nest], curr);
    console.log(key)

    if (!prev[key]) {
      prev[key] = [];
    }

    prev[key].push(curr);
    return prev;
  }, {})};

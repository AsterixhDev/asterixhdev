/* eslint-disable @typescript-eslint/no-explicit-any */
export const groupArray: <T>(array: any, value:string) => T = (array, value="catergory") =>{

 return array.reduce((prev: any, curr: any) => {
    const key = curr[value];

    if (!prev[key]) {
      prev[key] = [];
    }

    prev[key].push(curr);
    return prev;
  }, {})};

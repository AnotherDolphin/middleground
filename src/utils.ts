export interface Ranges {
    yourMin: number,
    yourMax: number,
    theirMin: number,
    theirMax: number
  }

export enum Done {
  neither = 0,
  onlyYou,
  onlyThem,
  both
}

export const checkStatus = (ranges: Ranges) : number => {
  const you = ranges?.yourMax != undefined && ranges.yourMax != -1
  const them = ranges?.theirMax != undefined && ranges.theirMax != -1
  if(you && !them) return Done.onlyYou
  if(!you && them) return Done.onlyThem
  if(you && them) return Done.both
  return Done.neither
}
import { Done, ProjectData } from "./interfaces"

export const checkStatus = (prog: ProjectData) : number => {
  const yourRange = prog?.yourMax != undefined && prog.yourMax != -1
  const theirRange = prog?.theirMax != undefined && prog.theirMax != -1
  if(yourRange && theirRange) return Done.bothSetRange
  if(yourRange) return Done.youSetRange
  if(theirRange) return Done.theySetRange
  const youConfirmed = prog?.youConfirmed != undefined && prog.youConfirmed
  const theyConfirmed = prog?.theyConfirmed != undefined && prog.theyConfirmed
  if(youConfirmed && theyConfirmed) return Done.bothConfirmed
  if(youConfirmed) return Done.youConfirmed
  if(theyConfirmed) return Done.theyConfirmed
  return Done.staging
}
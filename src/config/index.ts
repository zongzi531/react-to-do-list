export enum VIEWSTITLE {
  HOME = '{ To Do List }',
  SIGNIN = '{ Sign in }',
  REGISTER = '{ Register }',
}

export enum VIEWSAUTHOR {
  ZONG = 'by Zong',
}

export enum NOTE {
  HELP = 'Let\'s add your memo!',
  REGISTER = 'Don\'t use the real password, this is a demo!',
}

export enum COLOR {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
}

export enum COLORFLAG {
  ACTIVE = 'active',
  EMPTY = '',
}

export enum TODOSLABEL {
  FINISHED = 'Finished',
  UNFINISHED = 'Unfinished'
}

export enum NUMBER {
  MINUSONE = -1,
}

export enum STRING {
  EMPTY = '',
}

export interface ICOLOR {
  color: COLOR
  flag: COLORFLAG
}

export type COLORS = ICOLOR[]

export const COLORS: COLORS = [
  { color: COLOR.DEFAULT, flag: COLORFLAG.ACTIVE },
  { color: COLOR.PRIMARY, flag: COLORFLAG.EMPTY },
  { color: COLOR.SUCCESS, flag: COLORFLAG.EMPTY },
  { color: COLOR.INFO, flag: COLORFLAG.EMPTY },
  { color: COLOR.WARNING, flag: COLORFLAG.EMPTY },
  { color: COLOR.DANGER, flag: COLORFLAG.EMPTY }
]

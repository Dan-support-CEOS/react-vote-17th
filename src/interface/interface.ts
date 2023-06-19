export interface IUser {
    uid: number | null;
    name: string;
    team: string;
    part: string;
    accessToken: string;
    refreshToken: string;
  }

  export interface Ingroup{
    name: string;
    detail: string;
    id: number;
    score: number;
}

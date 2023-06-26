import { atom } from 'recoil';
import { IUser } from '@/interface/interface';

export const userState = atom<IUser>({
  key: 'userState',
  default: {
    name: '',
    team: '',
    part: '', //'fe'/'be'
    accessToken: '',
    //refreshToken: '', //이건 cookie에만 저장해도 되지 않나?!
  },
});

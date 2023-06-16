import { atom } from 'recoil';
import { IUser } from '@/interface/interface';

export const userState = atom<IUser>({
  key: 'userState',
  default: {
    uid: 0,
    name: '',
    team: '',
    part: '',
    accessToken: '',
    refreshToken: '', //이건 cookie에만 저장해도 되지 않나?!
  },
});

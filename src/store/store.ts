import { atom, selector } from 'recoil';
import { IUser } from '@/interface/interface';

export const userState = atom<IUser>({
  key: 'userState',
  default: {
    uid: null,
    name: '',
    team: '',
    part: '',
    accessToken: '',
    refreshToken: '', //이건 cookie에만 저장해도 되지 않나?!
  },
});

export const accessTokenSelector = selector({
  key: 'accessTokenSelector',
  get: ({ get }) => {
    const user = get(userState);
    const accessToken = user.accessToken;
    return accessToken;
  },
});

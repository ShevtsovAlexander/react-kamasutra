import { UserType } from '../types/types';

export const updateObjectInArray = (
  items: Array<UserType>,
  itemId: number,
  objPropName: string,
  newObjProps: { [key: string]: boolean },
) => {
  return items.map((u: any) => {
    if (u[objPropName] === itemId) {
      return { ...u, ...newObjProps };
    }
    return u;
  });
};

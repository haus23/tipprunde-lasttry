import { AtomEffect, atomFamily } from 'recoil';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { addEntity, db } from '@/api/firebase/db';
import { converter } from './converter';

export const repositoryFamily = <T>(
  key: string,
  pathBuilder: (param: string) => string
) => {
  let initialDataResolved = false;
  let resolveInitialData: (docs: T[]) => void;
  const initialData = new Promise<T[]>((resolve) => {
    resolveInitialData = resolve;
  });

  const syncResourceEffect: (param: string) => AtomEffect<T[]> =
    (param) =>
    ({ setSelf }) => {
      const q = query(
        collection(db, pathBuilder(param)).withConverter(converter<T>())
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map((doc) => doc.data());
        if (!initialDataResolved) {
          resolveInitialData(docs);
          initialDataResolved = true;
        } else {
          setSelf(docs);
        }
      });

      return () => {
        unsubscribe();
      };
    };

  return {
    docs: atomFamily<T[], string>({
      key,
      default: initialData,
      effects: (param) => [syncResourceEffect(param)],
    }),

    add: (param: string, doc: T) => addEntity(pathBuilder(param), doc),
  };
};

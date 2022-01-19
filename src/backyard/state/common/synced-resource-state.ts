import { converter, db } from '@/api/firebase/db';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { AtomEffect, atomFamily } from 'recoil';

export const syncedResourceState = <T>(
  key: string,
  pathBuilder: (param: string) => string
) => {
  let initialDataResolved = false;
  let resolveInitialData: (docs: T[]) => void;
  const initialData = new Promise<T[]>((resolve) => {
    resolveInitialData = resolve;
  });

  const syncResourceEffect: (path: string) => AtomEffect<T[]> =
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

  return atomFamily<T[], string>({
    key,
    default: initialData,
    effects_UNSTABLE: (param) => [syncResourceEffect(param)],
  });
};

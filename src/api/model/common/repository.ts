import { atom, AtomEffect } from 'recoil';
import {
  collection,
  onSnapshot,
  query,
  QueryConstraint,
} from 'firebase/firestore';
import { addEntity, db } from '@/api/firebase/db';
import { converter } from './converter';

export const repository = <T>(
  key: string,
  path: string,
  ...constraints: QueryConstraint[]
) => {
  let initialDataResolved = false;
  let resolveInitialData: (docs: T[]) => void;
  const initialData = new Promise<T[]>((resolve) => {
    resolveInitialData = resolve;
  });

  const syncResourceEffect: AtomEffect<T[]> = ({ setSelf }) => {
    const q = query(collection(db, path), ...constraints).withConverter(
      converter<T>()
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
    docs: atom<T[]>({
      key,
      default: initialData,
      effects_UNSTABLE: [syncResourceEffect],
    }),

    add: (doc: T) => addEntity(path, doc),
  };
};

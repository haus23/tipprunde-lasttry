import { useCallback, useMemo } from 'react';
import {
  collection,
  doc,
  DocumentReference,
  query,
  QueryConstraint,
  setDoc,
} from 'firebase/firestore';

import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

import { db } from '../firebase/db';
import { BaseModel } from '../model/common/base-model';
import { converter } from '../model/common/converter';

export const useCollectionOnce = <T extends BaseModel>(
  path: string,
  constraints: QueryConstraint[] = []
) => {
  const q = useMemo(
    () =>
      query<T>(
        collection(db, path).withConverter(converter<T>()),
        ...constraints
      ),
    [path, constraints]
  );

  const [values, loading, error] = useCollectionDataOnce(q);

  const add = useCallback(
    async (entity: T) => {
      let docRef: DocumentReference<T>;
      if (entity.id) {
        docRef = doc(db, path, entity.id).withConverter(converter<T>());
        await setDoc(docRef, entity);
      } else {
        docRef = doc(collection(db, path)).withConverter(converter<T>());
        await setDoc(docRef, entity);
        entity.id = docRef.id;
      }
      return entity;
    },
    [path]
  );

  return {
    values: values as T[],
    loading,
    error,
    add,
  };
};

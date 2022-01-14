import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  doc,
  DocumentReference,
  getDocs,
  onSnapshot,
  query,
  QueryConstraint,
  setDoc,
} from 'firebase/firestore';

import { db } from '@/api/firebase/db';
import { BaseModel } from '@/api/model/common/base-model';
import { converter } from '@/api/model/common/converter';

export const useCollection = <T extends BaseModel>(
  path: string,
  constraints: QueryConstraint[] = [],
  listen = true
) => {
  const [data, setData] = useState([] as T[]);

  const q = useMemo(
    () =>
      query<T>(
        collection(db, path).withConverter(converter<T>()),
        ...constraints
      ),
    [path, constraints]
  );

  /**
   * Adds an entity to the collection. Missing id will generate one.
   *
   * @param entity T
   */
  const add = async (entity: T) => {
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
  };

  useEffect(() => {
    if (listen) {
      return onSnapshot(q, (qs) => setData(qs.docs.map((doc) => doc.data())));
    } else {
      (async () => {
        const qs = await getDocs(q);
        setData(qs.docs.map((doc) => doc.data()));
      })();
    }
  }, [setData, q, listen]);

  return {
    data,
    add,
  };
};

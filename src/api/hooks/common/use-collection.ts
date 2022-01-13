import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  doc,
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

  const add = async (entity: T) => {
    const ref = doc(db, path, entity.id).withConverter(converter<T>());
    await setDoc(ref, entity);
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

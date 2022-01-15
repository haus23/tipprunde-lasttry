import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  getFirestore,
  PartialWithFieldValue,
  query,
  QueryConstraint,
} from 'firebase/firestore';

import { app } from './app';

export const db = getFirestore(app);

export interface BaseModel {
  id?: string;
}

export const converter = <
  T extends BaseModel
>(): FirestoreDataConverter<T> => ({
  toFirestore: (modelObject: PartialWithFieldValue<T>): DocumentData => {
    const { id, ...doc } = modelObject;
    return doc;
  },
  fromFirestore: (snapshot) =>
    ({
      id: snapshot.id,
      ...snapshot.data(),
    } as T),
});

export const getCollection = async <T>(
  path: string,
  ...constraints: QueryConstraint[]
) => {
  const snapshot = await getDocs(
    query(collection(db, path).withConverter(converter<T>()), ...constraints)
  );
  return snapshot.docs.map((doc) => doc.data());
};

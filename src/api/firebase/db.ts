import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  getFirestore,
  PartialWithFieldValue,
  setDoc,
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

export const addEntity = async <T extends BaseModel>(
  path: string,
  entity: T
) => {
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

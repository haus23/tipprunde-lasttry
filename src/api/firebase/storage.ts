import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './app';

const storage = getStorage(app);
const storageRef = (name: string) => ref(storage, name);

export { storageRef, uploadBytes, getDownloadURL };

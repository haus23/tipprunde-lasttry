import { app } from './app';
import { auth } from './auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage(app);

const getExtension = (str) => str.slice(str.lastIndexOf('.'));
const uploadUserImage = async (img: File) => {
  const filename = `profile-images/${auth.currentUser.uid}${getExtension(
    img.name
  )}`;
  const imageRef = ref(storage, filename);
  await uploadBytes(imageRef, img);
  return await getDownloadURL(imageRef);
};

export { uploadUserImage };

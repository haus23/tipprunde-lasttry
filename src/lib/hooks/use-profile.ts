import { useRecoilValue } from 'recoil';
import { authState } from '@/api/auth';
import { useDocument } from '@/api/hooks/use-document';
import { profileState } from '@/api/state/profile';
import { Profile } from '@/lib/model/profile';
import { useStorage } from '@/api/hooks/use-storage';
import { useEffect, useState } from 'react';

export const useProfile = () => {
  const {
    user: { id, email },
  } = useRecoilValue(authState);

  const { entity, update } = useDocument(profileState(id), 'profile');
  const [avatarUrl, uploadAvatar] = useStorage('avatars', entity.avatar_url);

  const [profile, setProfile] = useState<Profile>({
    email,
    name: entity.name,
    avatarUrl,
  });

  useEffect(() => {
    setProfile((current) => ({ ...current, avatarUrl }));
  }, [avatarUrl]);

  const updateProfile = async (name?: string, avatar?: File) => {
    let avatar_url = null;
    if (typeof avatar !== 'undefined') {
      const fileExt = avatar.name.split('.').pop();
      const fileName = `${id}-${Date.now()}.${fileExt}`;
      await uploadAvatar(avatar, fileName);
      avatar_url = fileName;
    }
    await update({ id, name, avatar_url });
  };

  return {
    profile,
    updateProfile,
  };
};

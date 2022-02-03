import { useRecoilValue } from 'recoil';
import { authState } from '@/api/auth';
import { useDocument } from '@/api/hooks/use-document';
import { profileState } from '@/api/state/profile';
import { Profile } from '@/lib/model/profile';

export const useProfile = () => {
  const {
    user: { id, email },
  } = useRecoilValue(authState);

  const { entity, update } = useDocument(profileState(id), 'profile');

  const updateProfile = async (name?: string, avatarUrl?: string) => {
    await update({ id, name, avatar_url: avatarUrl });
  };

  const profile: Profile = {
    email,
    name: entity?.name,
    avatarUrl: entity?.avatar_url,
  };

  return {
    profile,
    updateProfile,
  };
};

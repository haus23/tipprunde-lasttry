import { useRecoilValue } from 'recoil';
import { add as addTeam, teamDocs } from '@/api/model/team-repository';

export const useTeams = () => {
  const teams = useRecoilValue(teamDocs);

  return {
    teams,
    addTeam,
  };
};

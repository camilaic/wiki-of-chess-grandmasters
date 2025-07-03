export const BASE_API = `https://api.chess.com/pub`;
export const GRANDMASTERS_LIST_API_URL = `${BASE_API}/titled/GM`;

// TODO: handle this undefined
export const chessmasterProfile = (username: string | undefined): string => {
  return `${BASE_API}/player/${username}`;
};

export const profilePathName = (username: string): string => {
  return `/user/${username}`;
};

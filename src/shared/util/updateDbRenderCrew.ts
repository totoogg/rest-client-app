export const updateDbRenderCrew = (email: string) => {
  const dbRenderCrew = JSON.parse(localStorage.getItem('dbRenderCrew') || '{}');

  if (!dbRenderCrew[email]) {
    dbRenderCrew[email] = {
      variables: {},
      history: [],
    };
  }

  localStorage.setItem('dbRenderCrew', JSON.stringify(dbRenderCrew));
};

export function saveHistory(str: string) {
  if (typeof window !== 'undefined') {
    const user = JSON.parse(
      localStorage.getItem('userRenderCrew') || '{}'
    )?.user;

    const history = JSON.parse(localStorage.getItem('dbRenderCrew') || '{}')?.[
      user
    ]?.history;

    if (history && history[0] !== str) {
      const res = [str, ...history];
      localStorage.setItem(
        'dbRenderCrew',
        JSON.stringify({
          ...JSON.parse(localStorage.getItem('dbRenderCrew') || '{}'),
          [user]: {
            ...JSON.parse(localStorage.getItem('dbRenderCrew') || '{}')[user],
            history: Array.from(new Set(res as string[])),
          },
        })
      );
    }
  }
}

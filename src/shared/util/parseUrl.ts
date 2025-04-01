export const parseUrl = (url: string) => {
  const urlObject = new URL(url);
  const path = urlObject.pathname;
  const query = urlObject.searchParams;

  const pathSegments = path.split('/').filter(Boolean);

  return {
    pathSegments,
    query,
  };
};

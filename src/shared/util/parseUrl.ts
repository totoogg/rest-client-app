export const parseUrl = (url: string) => {
  if (!url) {
    return {
      pathSegments: [''],
      query: {
        query: {},
        size: 0,
        entries() {
          return [];
        },
      },
    };
  }

  const urlObject = new URL(url);
  const path = urlObject.pathname;
  const query = urlObject.searchParams;

  const pathSegments = path.split('/').filter(Boolean);

  return {
    pathSegments,
    query,
  };
};

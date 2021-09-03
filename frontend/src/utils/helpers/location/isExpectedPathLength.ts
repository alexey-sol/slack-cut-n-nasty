export const isExpectedPathLength = (pathname = "", segmentCount = 1) => pathname
    .split("/")
    .filter(Boolean)
    .length === segmentCount;

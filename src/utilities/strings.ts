export const getInitials = (
  username: string,
  first: string,
  last: string
): string => {
  if(!username) return '--';
  if (!first) return username.charAt(0).toUpperCase();

  const firstInitial = first.charAt(0).toUpperCase();
  const lastInitial = last ? last.charAt(0).toUpperCase() : "";

  return `${firstInitial}${lastInitial}`;
};

export const getAbbreviatedName = (
  username: string,
  first: string,
  last: string
): string => {
  if (!first) return username;

  const firstInitial = first.charAt(0).toUpperCase() + first.substr(1);
  const lastInitial = last ? last.charAt(0).toUpperCase() : "";

  return `${firstInitial} ${lastInitial}.`;
};

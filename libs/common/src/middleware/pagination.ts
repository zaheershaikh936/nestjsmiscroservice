export type paginationT = {
  page: number;
  limit: number;
  sort?: string;
  search?: string;
};
export const pagination = (pageV: number, limitV: number) => {
  const limit: number = limitV;
  const page: number = pageV;
  const skip = (page - 1) * limit;
  return { limit, page, skip };
};

import axiosClient2 from "./axiosClient2";

export const showtimesApi = {
  showtimeGetSingle: (id) => {
    const path = `/api/showtimes/${id}`;
    return axiosClient2.get(path);
  },
  showtimeGetByComplexes: () => {
    const path = `/api/cinema-complexes/showtimes`;
    return axiosClient2.get(path);
  },
};

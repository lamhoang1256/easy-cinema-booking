import { createSelector } from "reselect";
import formatDate from "../../utilities/formatDate";

// createSelector giúp truy cập reducer đồng thời thực hiện tính toán lọc lại dữ liệu, khi component render lại createSelector chỉ tính toán lại nếu movieDetailReducer thay đổi
const selectMobileData = createSelector(
  (state) => state.movieDetailReducer,
  (movieDetailReducer) => {
    // kiểm tra có lịch chiếu hay không, nếu không có thông báo hiện tại chưa có lịch chiếu
    const isEmptyData = movieDetailReducer.movieDetailShowtimes.heThongRapChieu?.length === 0;
    const heThongRapChieu = movieDetailReducer.movieDetailShowtimes.heThongRapChieu;

    // BƯỚC 1: tạo mảng chứa tất cả maLichChieu,
    //         thêm một số property sử dụng cho việc hiển thị dữ liệu: tenHeThongRap, tenCumRap, logo
    const arrayAllLichChieuPhimAddProp = heThongRapChieu?.reduce((colect1, heThongRapChieuItem) => {
      return [
        ...colect1,
        ...heThongRapChieuItem.cumRapChieu?.reduce((colect2, cumRapChieuItem) => {
          return [
            ...colect2,
            ...cumRapChieuItem.lichChieuPhim?.reduce((colect3, lichChieuPhimItem) => {
              return [
                ...colect3,
                {
                  ...lichChieuPhimItem,
                  tenHeThongRap: heThongRapChieuItem.tenHeThongRap,
                  tenCumRap: cumRapChieuItem.tenCumRap,
                  logo: heThongRapChieuItem.logo,
                },
              ];
            }, []),
          ];
        }, []),
      ];
    }, []);

    // BƯỚC 2: tạo mảng ngày
    const arrayDay = [
      ...new Set(arrayAllLichChieuPhimAddProp?.map((item) => item.ngayChieuGioChieu?.slice(0, 10))),
    ].sort();

    // BƯỚC 3: dựa trên mảng ngày, tạo ra mảng dữ liệu chính bằng cách lọc ra item theo ngày
    // sau đó return về arrayHeThongRapChieuFilterByDay để render
    const arrayHeThongRapChieuFilterByDay = arrayDay.map((date) => {
      const arrayLichChieuPhimFilterByDay = arrayAllLichChieuPhimAddProp.filter(
        (item) => item.ngayChieuGioChieu.slice(0, 10) === date
      );

      const arrayHeThongRapRemoveDup = arrayLichChieuPhimFilterByDay?.filter(
        (itemIncrease, indexIncrease, arr) =>
          indexIncrease === arr.findIndex((t) => t.tenHeThongRap === itemIncrease.tenHeThongRap)
      );
      const arrayHeThongRapItem = arrayHeThongRapRemoveDup.map((heThongRapItem) => {
        const arrayLichChieuPhimFilterByHeThongRap = arrayLichChieuPhimFilterByDay?.filter(
          (item) => item.tenHeThongRap === heThongRapItem.tenHeThongRap
        );
        const arrayCumRapChieuRemoveDup = arrayLichChieuPhimFilterByHeThongRap?.filter(
          (itemIncrease, indexIncrease, arr) =>
            indexIncrease === arr.findIndex((t) => t.tenCumRap === itemIncrease.tenCumRap)
        );

        const cumRapChieu = arrayCumRapChieuRemoveDup.map((cumRapChieu) => {
          const lichChieuPhim = arrayLichChieuPhimFilterByHeThongRap.filter(
            (lichChieuPhim) => lichChieuPhim.tenCumRap === cumRapChieu.tenCumRap
          );
          return {
            tenCumRap: cumRapChieu.tenCumRap,
            maLichChieu: cumRapChieu.maLichChieu,
            lichChieuPhim,
          };
        });
        return {
          tenHeThongRap: heThongRapItem.tenHeThongRap,
          logo: heThongRapItem.logo,
          cumRapChieu,
        };
      });

      return { date, heThongRap: arrayHeThongRapItem };
    });
    return { arrayHeThongRapChieuFilterByDay, isEmptyData };
  }
);

// đây chỉ là function nhằm mục đích tạo ra data mới từ currentSelectedHeThongRapChieu
const selectDesktopData = (currentSelectedHeThongRapChieu) => {
  // lọc ra tất cả lichChieuPhim và add thêm props tenCumRap để nhận biết lichChieuPhim này thuộc cụm rạp nào
  const arrayAllLichChieuPhim = currentSelectedHeThongRapChieu.cumRapChieu.reduce(
    (colect, item) => {
      return [
        ...colect,
        ...item.lichChieuPhim.map((lichChieu) => ({
          ...lichChieu,
          tenCumRap: item.tenCumRap,
        })),
      ];
    },
    []
  );

  // tạo mảng chỉ chứa ngày
  const arrayAllDay = arrayAllLichChieuPhim.map((item) => {
    return item.ngayChieuGioChieu.slice(0, 10); // tạo mảng mới với item là "2020-12-17" cắt ra từ 2020-12-17T10:10:00
  });
  const arrayDay = [...new Set(arrayAllDay)].sort(); // xóa đi phần tử trùng lặp

  // [ [{},{},{}], [{},{},{}], [{},{},{}]] : array chứa dữ liệu theo ngày, array con: [{ tenCumRap, maLichChieu, lichChieuPhim },{}]
  const allArrayCumRapChieuFilterByDay = arrayDay.map((day) => {
    // tạo mảng chứa lichchieuphim filter theo ngày
    const arrayLichChieuPhimFilterByDay = arrayAllLichChieuPhim.filter((item) => {
      if (item.ngayChieuGioChieu.slice(0, 10) === day) {
        return true;
      }
      return false;
    });

    // loại bỏ cumRapChieu trùng lặp
    const arrayCumRapChieuRemoveDup = arrayLichChieuPhimFilterByDay?.filter(
      (itemIncrease, indexIncrease, arr) => {
        const indexFirstFounded = arr.findIndex((t) => t.tenCumRap === itemIncrease.tenCumRap);
        return indexIncrease === indexFirstFounded;
      }
    );

    // tạo mảng cumRapChieu
    const arrayCumRapChieu = arrayCumRapChieuRemoveDup.map((cumRapChieu) => {
      const tenCumRap = cumRapChieu.tenCumRap;
      const maLichChieu = cumRapChieu.maLichChieu;
      // tạo mảng lichChieuPhim: trùng tenCumRap
      const lichChieuPhim = arrayLichChieuPhimFilterByDay.filter(
        (lichChieuPhim) => lichChieuPhim.tenCumRap === tenCumRap
      );
      return { tenCumRap, maLichChieu, lichChieuPhim };
    });

    return arrayCumRapChieu;
  });
  return { arrayDay, allArrayCumRapChieuFilterByDay };
};

const selectCommentByMaPhimAndCommentTest = createSelector(
  (state, maPhim) =>
    state.movieDetailReducer.commentList.filter((item) => item.dataTest || item.maPhim === maPhim), // nếu comment là dataTest hoặc trùng mã phim thì lấy
  (commentListFiltered) => {
    const commentList = commentListFiltered.sort(
      (a, b) => formatDate(b.createdAt).getTime - formatDate(a.createdAt).getTime
    );
    return { commentList };
  }
);

export { selectMobileData, selectDesktopData, selectCommentByMaPhimAndCommentTest };

// // createSelector giúp truy cập reducer đồng thời thực hiện tính toán lọc lại dữ liệu, khi component render lại createSelector chỉ tính toán lại nếu movieDetailReducer thay đổi
// const selectMobileData = createSelector(
//   state => state.movieDetailReducer,
//   movieDetailReducer => {
//     // kiểm tra có lịch chiếu hay không, nếu không có thông báo hiện tại chưa có lịch chiếu
//     const isEmptyData = movieDetailReducer.movieDetailShowtimes.heThongRapChieulength === 0
//     // bước 1: lọc lấy từng item chứa maLichChieu, thêm một số property sử dụng cho việc hiển thị dữ liệu: tenHeThongRap, tenCumRap, logo
//     const arrayAllLichChieuPhimAddProp = movieDetailReducer.movieDetailShowtimes.heThongRapChieu?.reduce((colect1, heThongRapChieuItem) => {
//       return [...colect1,
//       ...heThongRapChieuItem.cumRapChieu?.reduce((colect2, cumRapChieuItem) => {
//         return [...colect2,
//         ...cumRapChieuItem.lichChieuPhim?.reduce((colect3, lichChieuPhimItem) => {
//           return [...colect3, { ...lichChieuPhimItem, tenHeThongRap: heThongRapChieuItem.tenHeThongRap, tenCumRap: cumRapChieuItem.tenCumRap, logo: heThongRapChieuItem.logo }]
//         }, [])
//         ]
//       }, [])
//       ]
//     }, [])

//     // tạo mảng chứa tất cả ngày
//     const arrayDay = [...new Set(arrayAllLichChieuPhimAddProp?.map(item => (item.ngayChieuGioChieu?.slice(0, 10))))].sort()

//     // MẢNG CHA, ITEM LÀ CHỨA DATA THEO NGÀY: [ [{},{}], [{},{}], [{},{}] ]
//     const arrayHeThongRapChieuFilterByDay = arrayDay.map((date) => {

//       // tạo mảng chỉ chứa LichChieuPhim trùng ngày: các item cần thuộc nhiều hethongrap và cum rap, cần lọc lại theo he thong rạp và cumrap
//       const arrayLichChieuPhimFilterByDay = arrayAllLichChieuPhimAddProp.filter(item => {
//         if (item.ngayChieuGioChieu.slice(0, 10) === date) {
//           return true
//         }
//         return false
//       })
//       // tạo mảng heThongRap không trùng lặp
//       const arrayHeThongRapRemoveDup = arrayLichChieuPhimFilterByDay?.filter((itemIncrease, indexIncrease, arr) => {
//         const indexFirstFounded = arr.findIndex((t) => (
//           t.tenHeThongRap === itemIncrease.tenHeThongRap
//         ))
//         return indexIncrease === indexFirstFounded
//       })

//       // MẢNG CON: item là các HeThongRap: [ {tenHeThongRap: "gd", logo: "ht", cumRapChieu: [{tenCumRap: " ", maLichChieu: "", lichChieuPhim: [{},{}] }] }, {},,, ]
//       const arrayHeThongRapItem = arrayHeThongRapRemoveDup.map(item => {
//         const tenHeThongRap = item.tenHeThongRap
//         const logo = item.logo

//         // tạo mảng chỉ chứa item trùng tenHeThongRap
//         const arrayLichChieuPhimFilterByHeThongRap = arrayLichChieuPhimFilterByDay?.filter((item, index) => {
//           if (item.tenHeThongRap === tenHeThongRap) {
//             return true
//           }
//           return false
//         })

//         // loại bỏ cumRapChieu trùng lặp
//         const arrayCumRapChieuRemoveDup = arrayLichChieuPhimFilterByHeThongRap?.filter((itemIncrease, indexIncrease, arr) => {
//           const indexFirstFounded = arr.findIndex((t) => (
//             t.tenCumRap === itemIncrease.tenCumRap
//           ))
//           return indexIncrease === indexFirstFounded
//         })

//         // tạo mảng cumRapChieu: tenCumRap, maLichChieu, lichChieuPhim: []
//         const cumRapChieu = arrayCumRapChieuRemoveDup.map(cumRapChieu => {
//           const tenCumRap = cumRapChieu.tenCumRap
//           const maLichChieu = cumRapChieu.maLichChieu
//           // tạo mảng lichChieuPhim: item lọc theo tenCumRap
//           const lichChieuPhim = arrayLichChieuPhimFilterByHeThongRap.filter(lichChieuPhim => lichChieuPhim.tenCumRap === tenCumRap)
//           return { tenCumRap, maLichChieu, lichChieuPhim }
//         })
//         // obj trong mảng con
//         return { tenHeThongRap, logo, cumRapChieu }
//       })

//       // return arrayHeThongRapItem // [{tenHeThongRap: "gd", logo: "ht", cumRapChieu: [{tenCumRap: " ", maLichChieu: "", lichChieuPhim: [{},{}]}]}]
//       return { date, heThongRap: arrayHeThongRapItem }
//     })
//     return { arrayHeThongRapChieuFilterByDay, isEmptyData }
//   }
// )

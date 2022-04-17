export const cinemaFilterByDay = (data) => {
  // kiểm tra có lịch chiếu hay không, nếu không có thông báo hiện tại chưa có lịch chiếu
  const isEmptyData = data.heThongRapChieu?.length === 0;
  const heThongRapChieu = data.heThongRapChieu;

  // BƯỚC 1: tạo mảng chứa tất cả maLichChieu,
  // thêm một số property sử dụng cho việc hiển thị dữ liệu: tenHeThongRap, tenCumRap, logo
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
  return arrayHeThongRapChieuFilterByDay;
};

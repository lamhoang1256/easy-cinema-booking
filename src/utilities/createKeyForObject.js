// Eg: [{ name: "John", age: 18}, {name: "Lisa", age: 20}]
// -> [{key: 1, name: "John", age:18}, {key: 2, name: "Lisa", age:20 }]

export const createKeyForObj = (data) => {
  const dataHasKey = data.map((item, index) => {
    return {
      ...item,
      key: index,
    };
  });

  return dataHasKey;
};

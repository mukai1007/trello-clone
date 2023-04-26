const mergeDataWithKey = (data) => {
  if (!data) {
    return [];
  }
  return Object.values(data).map((value, index) => {
    return {
      ...value,
      key: Object.keys(data)[index],
    };
  });
}

const getBoardKey = () => {
  const arr = window.location.href.split("/");
  return arr[4];
}

const byPropKey = (propertyName, value) => {
  return {
    [propertyName]: value,
  };
}

export { mergeDataWithKey, getBoardKey, byPropKey }

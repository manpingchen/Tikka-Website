function sortByLength(array, key) {
  return array.sort((a, b) => {
    const nameA = a[key].length;
    const nameB = b[key].length;

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

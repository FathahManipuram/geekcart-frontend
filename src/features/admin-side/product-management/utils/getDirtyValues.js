export const getDirtyValues = (dirtyFields, allValues) => {

  const dirtyValues = {};

  Object.keys(dirtyFields).forEach((key) => {
   
    if (
      typeof dirtyFields[key] === "object" &&
      !Array.isArray(dirtyFields[key]) &&
      dirtyFields[key] !== null
    ) {
      dirtyValues[key] = getDirtyValues(dirtyFields[key], allValues[key]);
    } else {
      dirtyValues[key] = allValues[key];
    }
  });

  return dirtyValues;
};

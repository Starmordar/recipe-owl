const fileFields = ['image'];
const dataFields = ['title', 'description', 'source', 'cookTime', 'tags', 'ingredients', 'steps'];

const allowedFields = [...fileFields, ...dataFields];

function dbDataToFormValues(dbData: Record<string, unknown>, fields: Array<string>) {
  const result: Record<string, unknown> = {};

  for (const key in dbData) {
    if (!fields.includes(key)) continue;
    result[key] = dbData[key];
  }

  return result;
}

export { dbDataToFormValues, allowedFields, dataFields, fileFields };

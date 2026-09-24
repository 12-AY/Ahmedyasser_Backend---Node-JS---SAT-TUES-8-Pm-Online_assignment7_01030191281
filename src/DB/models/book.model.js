// Validation rule used with db.createCollection("books", { validator: ... })
// Ensures every book document has a non-empty "title" string field.
export const booksValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["title"],
    properties: {
      title: {
        bsonType: "string",
        minLength: 1,
        description: "title is required and must be a non-empty string",
      },
      author: {
        bsonType: "string",
        description: "author must be a string",
      },
      year: {
        bsonType: "int",
        description: "year must be an integer",
      },
      genres: {
        bsonType: "array",
        items: {
          bsonType: "string",
        },
        description: "genres must be an array of strings",
      },
    },
  },
};

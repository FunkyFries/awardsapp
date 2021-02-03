export const teachers = [
  "Mrs. Martin",
  "Mrs. Johnson",
  "Ms. Nathanson",
  "Mrs. Estep",
  "Mrs. Dilley",
  "Ms. Terpstra",
  "Mrs. Brar",
  "Mrs. Carroll",
  "Mrs. Haberman",
  "Mr. Kranik",
  "Mrs. Kasemeier",
  "Mrs. Helle",
  "Mrs. Kidd",
];

export const primaryTeachers = [
  "Mrs. Martin",
  "Mrs. Johnson",
  "Ms. Nathanson",
  "Mrs. Estep",
  "Mrs. Dilley",
  "Ms. Terpstra",
  "Mrs. Brar",
];

export const intermediateTeachers = [
  "Mrs. Carroll",
  "Mrs. Haberman",
  "Mr. Kranik",
  "Mrs. Kasemeier",
  "Mrs. Helle",
  "Mrs. Kidd",
];

export const bandTeachers = ["Mrs. Kidd", "Mrs. Helle"];

export const recessSpecialists = ["Mrs. Raab & Mrs. Zaharevich"];

export const specialists = [
  "Mr. Leach",
  "Mr. Bloomstine",
  "Mrs. Sievers",
  "Mr. Neptun",
];

export function determineGrade(teacher) {
  if (
    teacher === "Mrs. Martin" ||
    teacher === "Mrs. Johnson" ||
    teacher === "Ms. Nathanson"
  ) {
    return "Kindergarten";
  } else if (teacher === "Mrs. Dilley" || teacher === "Mrs. Estep") {
    return "First Grade";
  } else if (teacher === "Ms. Terpstra" || teacher === "Mrs. Brar") {
    return "Second Grade";
  } else if (teacher === "Mrs. Haberman" || teacher === "Mrs. Carroll") {
    return "Third Grade";
  } else if (teacher === "Mr. Kranik") {
    return "Fourth Grade";
  } else if (teacher === "Mrs. Kasemeier") {
    return "Fifth Grade";
  } else if (teacher === "Mrs. Kidd" || teacher === "Mrs. Helle") {
    return "Sixth Grade";
  }
}

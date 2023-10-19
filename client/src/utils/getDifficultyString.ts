export const getDifficultyString = (difficulty: number): string | null => {
  switch (difficulty) {
    case 1:
      return "Easy";
    case 2:
      return "Med-Easy";
    case 3:
      return "Medium";
    case 4:
      return "Med-Advanced";
    case 5:
      return "Advanced";
    default:
      return "";
  }
};

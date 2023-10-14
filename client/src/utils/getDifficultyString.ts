export const getDifficultyString = (difficulty: number): string | null => {
  if (difficulty > 5 || difficulty < 1) {
    return null;
  }

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
  }
  return null;
};

const validateBasedOnProbability = (probability) => {
  const random = Math.random();
  if (random < probability) {
    return true;
  }
  return false;
};

export { validateBasedOnProbability };

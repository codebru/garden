const validateBasedOnProbability = (probability) => {
  const random = Math.random();
  if (random < probability) {
    return true;
  }
  return false;
};

const randomIntiger = (min, max) => {
  const random = Math.random();
  return Math.floor(random * (max - min + 1)) + min;
};

export { validateBasedOnProbability, randomIntiger };

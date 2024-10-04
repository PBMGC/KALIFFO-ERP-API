import { createTrigger, dropTrigger } from "./producto";

export const initTriggers = async () => {
  await dropTrigger();

  await createTrigger();
};

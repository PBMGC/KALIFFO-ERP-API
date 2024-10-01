import cron from "node-cron";

export const initCronJobs = () => {
  cron.schedule("39 00 * * *", () => {
    console.log("=========================================");
    console.log("adsa");
  });
};

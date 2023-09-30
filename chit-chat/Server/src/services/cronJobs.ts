import cron from "node-cron";
import User from "../models/User";

function initCronJobs() {
  cron.schedule("* * * * *", async () => {
    try {
      const count = await User.count({
        where: {
          isLogged: false,
        },
      });
      console.log("count of offline:", count);
    } catch (error: any) {
      console.log(error);
    }
  });
}
export default initCronJobs;

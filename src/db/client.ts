// import mongoose from "mongoose";
// import debuggr from "debug";

// export const initDbConnect = async () => {
//   const debug = debuggr("resume-to-profile:database");
//   let connectString = "";
//   switch (true) {
//     case process.env.NODE_ENV === "production":
//       connectString += process.env.PRD_DATABASE_URL;
//       break;
//     case process.env.NODE_ENV === "development":
//       connectString += process.env.DEV_DATABASE_URL;
//   }
//   await mongoose.connect(connectString, {
//     autoIndex: process.env.NODE_ENV === "production" ? false : true,
//   });
//   debug("Database connection successful");
// };

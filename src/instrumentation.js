import connectToDatabase from "@/app/_server/db";

export async function register() {
  console.log("Middleware: Connecting to MongoDB");
  await connectToDatabase();
}
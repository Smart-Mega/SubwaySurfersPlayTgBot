import { ref, child, get, set, onValue, Database } from "firebase/database";

export async function writeData(db: Database, path: string, data: any) {
  try {
    await set(ref(db, path), data);
  } catch (e) {}
}

export async function readData(db: Database, path: string) {
  try {
    const data = await get(ref(db, path));
    return data.val();
  } catch (e) {}
}
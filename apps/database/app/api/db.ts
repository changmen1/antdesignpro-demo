'use server'
import { Pool } from 'pg';

let tempPool = new Pool({
  connectionString: 'postgres://postgres:root@localhost:5432/postgre-basics',
  connectionTimeoutMillis: 2000,
});

export async function pgConnect() {
  try {
    await tempPool.connect();
    return "连接成功";
  } catch (err: any) {
    return "连接失败: " + err.message;
  }
}

export async function pgQuery(text: string, params?: any) {
  const start = Date.now();
  try {
    const result = await tempPool.query(text, params);
    const duration = Date.now() - start;
    console.log(
      `Executed query: , ${{ text, duration, rows: result.rowCount }}`
    );
    return JSON.stringify(result);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function pgEnd() {
  try {
    await tempPool.end();
    return "成功";
  } catch (err: any) {
    return "失败"
  }
}
'use client';

// TODO 1）多数据库适配兼容：支持与 Oracle、MySQL、SQL Server、PostgreSQL 等主流数据库对接，支持异构数据库数据集成与同步，可实现与院内现有系统的数据库无缝对接；

import { Button } from "@repo/ui/button";
import Image from "next/image";
import { pgConnect, pgEnd, pgQuery } from "./api/db";
import styles from "./page.module.css";

export default function Home() {

  const handleConnect = async () => {
    const result = await pgConnect();
    console.log(result);
  };

  const handleEnd = async () => {
    const result = await pgEnd();
    console.log(result);
  }

  const handleSql = async () => {
    const result = await pgQuery("SELECT * FROM users");
    console.log('结果', JSON.parse(result).rows);
  }
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button appName="docs" className={styles.secondary} fn={handleConnect}>
          连接pgsql
        </Button>
        <Button appName="docs" className={styles.secondary} fn={handleSql}>
          测试语句
        </Button>
        <Button appName="docs" className={styles.secondary} fn={handleEnd}>
          关闭连接
        </Button>
      </main>
      <footer className={styles.footer}>
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          数据库配置
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          安全设置 →
        </a>
      </footer>
    </div>
  );
}


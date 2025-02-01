import slowDown from 'express-slow-down';

import { env } from '@/common/utils/envConfig';

const rateLimiter = slowDown({
  windowMs: 60 * env.COMMON_RATE_LIMIT_WINDOW_MS, // 1 minute
  delayAfter: 30, // Start slowing down after 30 requests
  delayMs: (_: any, res: any) => (res.slowDown.count - 30) * 100, // Incremental delay,
  keyGenerator: (req: any) => req.ip as string,
});

export default rateLimiter;

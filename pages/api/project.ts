import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/lib/db';
import { validateJWT } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

  await db.project.create({
    data: {
      name: req.body.name,
      ownerId: user.id,
    },
  });

  res.json({ data: { message: 'ok' } });
}

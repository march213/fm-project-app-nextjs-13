import { NextApiRequest, NextApiResponse } from 'next';
import { comparePasswords, createJWT, hashPassword } from '@/lib/auth';

import { db } from '@/lib/db';
import { serialize } from 'cookie';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(401);
      res.json({ error: 'Invalid login' });
      return;
    }

    const isUser = await comparePasswords(password, user.password);
    if (isUser) {
      const jwt = await createJWT(user);
      res.setHeader(
        'Set-Cookie',
        serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        }),
      );
      res.status(201);
      res.end();
    } else {
      res.status(401);
      res.json({ error: 'Invalid login' });
    }
  } else {
    res.status(402);
    res.end();
  }
}

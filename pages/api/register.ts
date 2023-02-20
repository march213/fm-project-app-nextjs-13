import { NextApiRequest, NextApiResponse } from 'next';
import { createJWT, hashPassword } from '@/lib/auth';

import { db } from '@/lib/db';
import { serialize } from 'cookie';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, firstName, lastName } = req.body;

    const hashedPassword = await hashPassword(req.body.password);

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

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
    res.status(402);
    res.end();
  }
}

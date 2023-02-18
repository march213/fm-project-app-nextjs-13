'use client';

import { FormEvent, useCallback, useState } from 'react';
import { register, signin } from '@/lib/api';

import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const registerContent = {
  linkUrl: '/signin',
  linkText: 'Already have an account?',
  header: 'Create a new Account',
  subheader: 'Just a few things to get started',
  buttonText: 'Register',
};

const signinContent = {
  linkUrl: '/register',
  linkText: "Don't have an account?",
  header: 'Welcome Back',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign In',
};

const initial = { email: '', password: '', firstName: '', lastName: '' };

export function AuthForm({ mode }: { mode: 'register' | 'signin' }) {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState('');

  const router = useRouter();
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        if (mode === 'register') {
          await register(formState);
        } else {
          await signin(formState);
        }

        router.replace('/home');
      } catch (e) {
        setError(`Could not ${mode}`);
      } finally {
        setFormState({ ...initial });
      }
    },
    [formState, router, mode],
  );

  const content = mode === 'register' ? registerContent : signinContent;

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mt-6 mb-2 font-bold">{content.header}</h2>
          <p className="tex-lg text-black/40">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {mode === 'register' && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <label htmlFor="firstName" className="text-lg ml-2 text-black/50">
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) => setFormState((s) => ({ ...s, firstName: e.target.value }))}
                />
              </div>
              <div className="pl-2">
                <label htmlFor="lastName" className="text-lg ml-2 text-black/50">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={(e) => setFormState((s) => ({ ...s, lastName: e.target.value }))}
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <label htmlFor="email" className="text-lg ml-2 text-black/50">
              Email
            </label>
            <Input
              id="email"
              name="email"
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="text-lg ml-2 text-black/50">
              Password
            </label>
            <Input
              id="password"
              name="password"
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) => setFormState((s) => ({ ...s, password: e.target.value }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link href={content.linkUrl} className="text-blue-600 font-bold">
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}

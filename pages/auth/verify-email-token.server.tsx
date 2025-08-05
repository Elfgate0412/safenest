export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import type { GetServerSidePropsContext } from 'next';
import type { ReactElement } from 'react';

const VerifyEmailToken = () => {
  return <></>;
};

VerifyEmailToken.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const token = query.token as string;

  if (!token) {
    return { notFound: true };
  }

  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });

    if (!verificationToken) {
      return {
        redirect: {
          destination: '/auth/login?error=token-not-found',
          permanent: false,
        },
      };
    }

    if (new Date() > verificationToken.expires) {
      return {
        redirect: {
          destination: '/auth/login?error=token-expired',
          permanent: false,
        },
      };
    }

    await Promise.allSettled([
      prisma.user.update({
        where: { email: verificationToken.identifier },
        data: { emailVerified: new Date() },
      }),
      prisma.verificationToken.delete({ where: { token } }),
    ]);

    return {
      redirect: {
        destination: '/auth/login?success=email-verified',
        permanent: false,
      },
    };
  } catch (error) {
    console.error('Error verifying token:', error);
    return {
      redirect: {
        destination: '/auth/login?error=internal-error',
        permanent: false,
      },
    };
  }
};

export default VerifyEmailToken;

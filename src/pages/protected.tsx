import { getSession, useSession } from "next-auth/react";
import { Heading } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next/types";
type Props = {};

const Protected = (props: Props) => {
  //statusはloading,authenticated,unathenticated
  const { data: session, status } = useSession();
  if (status === "unauthenticated")
    return (
      <Heading>You are unauthenticated. this is a protected page.</Heading>
    );

  return <Heading>{session?.user?.email}</Heading>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  //セッションがない＝認証されていない場合はサインインのページへ飛ばす
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
      },
    };
  }
  return {
    props: { session },
  };
};
export default Protected;

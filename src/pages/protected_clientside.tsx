import { getSession, useSession } from "next-auth/react";
import { Heading } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next/types";
import { useRouter } from "next/router";
type Props = {};

const Protected = (props: Props) => {
  const { push } = useRouter();
  //statusはloading,authenticated,unathenticated
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      push("/auth/some");
    },
  });
  if (status === "loading") {
    return <Heading>Loading...</Heading>;
  }

  if (status !== "authenticated") {
    return (
      <Heading>You are unauthenticated. this is a protected page.</Heading>
    );
  }

  if (status === "authenticated") {
    return <Heading>{session?.user?.email}</Heading>;
  }
};

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const session = await getSession(ctx);

//   //セッションがない＝認証されていない場合はサインインのページへ飛ばす
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// };
export default Protected;

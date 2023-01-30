import { FC } from "react";
import { Heading, Button } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Home: FC = () => {
  const { data: session } = useSession();

  const { push } = useRouter();
  const handleSignOut = async () => {
    //サインアウトしたときに/someに遷移する
    const data = await signOut({ redirect: false, callbackUrl: "/some" });

    //redirect:falseにしているのでrouterで遷移させる
    push(data.url);
  };

  return (
    <div>
      {session ? (
        <>
          <Heading>You are signed in {session.user?.email}</Heading>
          <Button onClick={() => handleSignOut()}>Sign out</Button>
        </>
      ) : (
        <>
          <Heading>You are not signed in</Heading>
          <Button onClick={() => signIn()}>Sign in</Button>
        </>
      )}
    </div>
  );
};

export default Home;

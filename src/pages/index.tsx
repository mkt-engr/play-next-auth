import { FC } from "react";
import { Heading, Button, Grid } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Home: FC = () => {
  const { data: session } = useSession();
  //asPath
  const { push, asPath } = useRouter();
  const handleSignOut = async () => {
    //サインアウトしたときに/someに遷移する
    const data = await signOut({
      redirect: false,
      callbackUrl: "/auth/signin",
    });
    //redirect:falseにしているのでrouterで遷移させる
    push(data.url);
  };

  const handleSignIn = async () => {
    push(`/auth/signin?callbackUrl=${asPath}`);
  };
  return (
    <Grid placeItems={"center"} gridRowGap={"1rem"}>
      {session ? (
        <>
          <Heading>You are signed in {session.user?.email}</Heading>
          <Button onClick={() => handleSignOut()}>Sign out</Button>
        </>
      ) : (
        <>
          <Heading>You are not signed in</Heading>
          <Button onClick={() => handleSignIn()}>Sign in</Button>
        </>
      )}
    </Grid>
  );
};

export default Home;

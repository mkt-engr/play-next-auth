import { FC } from "react";
import { Heading, Button } from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/react";

const Home: FC = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <Heading>You are signed in</Heading>
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

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Grid,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  chakra,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGithub, BsTwitter, BsGoogle } from "react-icons/bs";

const providers = [
  {
    name: "github",
    Icon: BsGithub,
  },
  {
    name: "twitter",
    Icon: BsTwitter,
  },
  {
    name: "google",
    Icon: BsGoogle,
  },
];

const Signin = () => {
  //サインインしている？ユーザーがこのページに来ないようにしたい
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const [email, setEmail] = useState("");

  if (status === "loading") {
    return <Heading>Checking Authentication ...</Heading>;
  }

  if (session) {
    setTimeout(() => {
      push("/");
    }, 3000);
    return <Heading>You are already signed in</Heading>;
  }

  const handleOAuthSignin = (provider: string) => {
    //signInメソッドにgoogleやgithubなどの文字列を渡すとその認証をかけられる
    signIn(provider);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email) return false;
    signIn("email", { email, redirect: false });
  };

  return (
    <Box>
      <chakra.form onSubmit={handleSubmit}>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button type="submit" w="100%" my={5}>
          Login
        </Button>
      </chakra.form>
      <VStack>
        {providers.map(({ name, Icon }) => {
          return (
            <Button
              key={name}
              leftIcon={<Icon />}
              onClick={() => {
                handleOAuthSignin(name);
              }}
              textTransform="uppercase"
            >
              Sign in with {name}
            </Button>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Signin;

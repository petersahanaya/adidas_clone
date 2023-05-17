import AppBar from "@/components/appBar/AppBar";
import Heading from "@/components/heading/Heading";
import Container from "@components/container/Container";
import Subtitle from "@/components/subtitle/Subtitle";
import SignInAuth from "./SignInAuth";
import SignInPreview from "./SignInPreview";
import AdidasIcon from "@/components/icons/adidasIcon/AdidasIcon";

export const metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <main className="w-screen h-screen">
      <AppBar height="h-[8vh]" background="bg-transparent">
        <AdidasIcon height={30} width={30} />
      </AppBar>
      <SignInPreview />
      <Container height="h-max" width="w-screen" padding="px-3 py-8">
        <nav className="lg:flex justify-center items-center gap-80">
          <section>
            <Heading
              margin="mb-2"
              size="text-5xl"
              color="text-stone-800 sm:text-7xl"
            >
              Sign In
            </Heading>
            <Subtitle size="text-[.75rem] sm:text-lg" color="text-stone-400">
              sign in to your account.
            </Subtitle>
          </section>
          <SignInAuth />
        </nav>
      </Container>
    </main>
  );
};

export default SignInPage;

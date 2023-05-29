import AppBar from "@components/appBar/AppBar";
import Heading from "@components/heading/Heading";
import Container from "@components/container/Container";
import SignInAuth from "./SignInAuth";
import SignInPreview from "./SignInPreview";
import AdidasIcon from "@components/icons/adidasIcon/AdidasIcon";
import SignInAnimation from "../../../../public/lottie-sign.json";
import LottieComp from "@components/lottie/LottieComp";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <main className="w-screen h-screen">
      <AppBar height="h-[8vh]" background="bg-transparent">
        <AdidasIcon height={35} width={35} />
      </AppBar>
      <SignInPreview />
      <Container height="h-max" width="w-screen" padding="px-3 py-8">
        <nav className="lg:flex justify-center items-center gap-80">
          <section className="lg:hidden">
            <Heading size="text-5xl" color="text-stone-800 sm:text-7xl">
              Sign In
            </Heading>
          </section>
          <nav className="hidden lg:inline-block">
            <LottieComp
              isDescription={false}
              subtitle=""
              title=""
              buttonText=""
              animation={SignInAnimation}
            />
          </nav>
          <SignInAuth />
        </nav>
      </Container>
    </main>
  );
};

export default SignInPage;

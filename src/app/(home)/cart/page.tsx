import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import CartClient from "./cartClient/CartClient";

export const metadata = {
  title: "Cart",
};

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const CartPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <main className="w-screen h-screen">
      <CartClient session={session!} />
    </main>
  );
};

export default CartPage;

/*
  export const fetchCache = 'force-no-store'
  export const dynamic = 'force-dynamic'
*/

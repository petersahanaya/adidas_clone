import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import CartClient from "./cartClient/CartClient";

const CartPage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <main className="w-screen h-screen">
      <CartClient session={session!} />
    </main>
  );
};

export default CartPage;

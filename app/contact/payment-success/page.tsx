"use client";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Stripe from "stripe";
import Success from "@/app/payment-success/page";
export default function Page() {
  return Success;
}
// export default function Success(context: any) {
//   const sessionId = context.searchParams.session_id;
//   type TSession = Stripe.Response<Stripe.Checkout.Session>;
//   const [session, setSession] = useState<TSession | null>(null);

//   const formatter = new Intl.NumberFormat("be-NL", {
//     style: "currency",
//     currency: "EUR",
//   });

//   useEffect(() => {
//     axios.get(`/api/session/${sessionId}`).then((res) => {
//       setSession(res.data);
//     });
//   }, []);

//   return (
//     <div className="text-9xl font-sunflower text-black">
//       {session && (
//         <div className="text-xl font-george">
//           <p>{session?.customer_details?.name}</p>
//           <p>{session?.customer_details?.email}</p>
//           <p>{session?.customer_details?.phone}</p>
//           <p>{formatter.format(session.amount_subtotal! / 100)}</p>
//           <p>{formatter.format(session.total_details?.amount_tax!)}</p>
//           <p>{formatter.format(session.amount_total! / 100)}</p>
//         </div>
//       )}
//     </div>
//   );
// }

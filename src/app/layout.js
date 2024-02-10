import "../styles/globals.css";
import "../styles/buttons.css";
import Header from "../components/global/header/header";
import { CartProvider } from "../utils/cartContext";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
          </body>
      </html>
    </CartProvider>
  );
}

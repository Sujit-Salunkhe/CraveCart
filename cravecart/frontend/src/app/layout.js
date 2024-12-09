import "./globals.css";
import StoreProvider from "./storeprovider";
import SelectNavBar from "@/components/SelectNavBar";
import { Provider } from "@/components/ui/provider";
function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <StoreProvider>
          <header>
            <SelectNavBar />
          </header>
          <Provider>
          {children}
          </Provider>
          
        </StoreProvider>
      </body>
    </html>
  );
}

export default RootLayout;

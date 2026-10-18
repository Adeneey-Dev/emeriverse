import { Home } from "./pages/Home";
import { ThemeProvider } from "./providers/ThemeProvider";
import { CartProvider } from "./providers/CartProvider";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Home />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;

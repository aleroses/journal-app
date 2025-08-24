import { AppRouter } from "./router/AppRouter";
import { Theme } from "./theme/Theme";

export const App = () => {
  return (
    <Theme>
      <AppRouter />
    </Theme>
  );
};

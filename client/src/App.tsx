import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Characters from "@/pages/Characters";
import Quiz from "@/pages/Quiz";
import Games from "@/pages/Games";
import Extras from "@/pages/Extras";
import { ThemeProvider } from "@/hooks/useTheme";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/characters" component={Characters} />
      <Route path="/quiz" component={Quiz} />
      <Route path="/games" component={Games} />
      <Route path="/extras" component={Extras} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
